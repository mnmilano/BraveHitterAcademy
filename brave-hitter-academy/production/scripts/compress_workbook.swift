import AppKit
import CoreGraphics
import PDFKit

guard CommandLine.arguments.count == 3 else {
    fputs("usage: compress_workbook INPUT.pdf OUTPUT.pdf\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
guard let document = PDFDocument(url: inputURL) else {
    fatalError("Unable to open input PDF")
}
guard let consumer = CGDataConsumer(url: outputURL as CFURL) else {
    fatalError("Unable to create output PDF")
}

var defaultBox = CGRect(x: 0, y: 0, width: 792, height: 612)
guard let pdf = CGContext(consumer: consumer, mediaBox: &defaultBox, nil) else {
    fatalError("Unable to create PDF context")
}

let scale: CGFloat = 2.0 // 144 DPI for PDF's 72-point coordinate system.
let colorSpace = CGColorSpaceCreateDeviceRGB()

for index in 0..<document.pageCount {
    autoreleasepool {
        guard let page = document.page(at: index) else { fatalError("Missing page \(index + 1)") }
        let box = page.bounds(for: .mediaBox)
        let width = Int(box.width * scale)
        let height = Int(box.height * scale)
        guard let bitmap = CGContext(
            data: nil,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: colorSpace,
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
        ) else { fatalError("Unable to allocate page bitmap") }

        bitmap.setFillColor(NSColor.white.cgColor)
        bitmap.fill(CGRect(x: 0, y: 0, width: width, height: height))
        bitmap.scaleBy(x: scale, y: scale)
        bitmap.translateBy(x: -box.origin.x, y: -box.origin.y)
        page.draw(with: .mediaBox, to: bitmap)

        guard let rendered = bitmap.makeImage() else { fatalError("Unable to render page") }
        let rep = NSBitmapImageRep(cgImage: rendered)
        guard let jpeg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.82]),
              let source = CGImageSourceCreateWithData(jpeg as CFData, nil),
              let compressed = CGImageSourceCreateImageAtIndex(source, 0, nil)
        else { fatalError("Unable to compress page") }

        let pageInfo = [kCGPDFContextMediaBox: NSData(bytes: [box.origin.x, box.origin.y, box.width, box.height], length: MemoryLayout<CGRect>.size)] as CFDictionary
        pdf.beginPDFPage(pageInfo)
        pdf.draw(compressed, in: box)
        pdf.endPDFPage()

        if (index + 1) % 10 == 0 || index + 1 == document.pageCount {
            print("compressed \(index + 1)/\(document.pageCount)")
        }
    }
}

pdf.closePDF()
