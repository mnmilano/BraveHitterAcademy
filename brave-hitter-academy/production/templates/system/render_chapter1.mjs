import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import PDFDocument from 'pdfkit';
import { FONT, PAGE } from './production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.resolve(here, '..');
const root = path.resolve(templatesDir, '../..');
const base = path.join(root, 'production/pages/chapter-01');
const sourceDir = path.join(base, 'source');
const pngDir = path.join(base, 'png');
const pdfDir = path.join(base, 'pdf');
fs.mkdirSync(pngDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });

const fontPath = (relative) => path.join(root, relative);
const renderFontFiles = [
  FONT.displayRenderRegularFile,
  FONT.displayRenderBoldFile,
  FONT.bodyRenderRegularFile,
  FONT.bodyRenderSemiboldFile,
  FONT.bodyRenderBoldFile,
].map(fontPath);
const sourceFiles = Array.from({ length: 7 }, (_, index) => path.join(sourceDir, `chapter_1_page_${index + 1}.svg`));

for (const sourceFile of sourceFiles) {
  const svg = fs.readFileSync(sourceFile, 'utf8');
  const renderer = new Resvg(svg, {
    fitTo: { mode: 'width', value: PAGE.widthPx },
    font: { fontFiles: renderFontFiles, loadSystemFonts: false, defaultFontFamily: FONT.bodyFamily },
  });
  const png = renderer.render().asPng();
  const output = path.join(pngDir, path.basename(sourceFile, '.svg') + '.png');
  fs.writeFileSync(output, png);
}

const pdfPath = path.join(pdfDir, 'brave-hitter-academy-chapter-01.pdf');
const pdf = new PDFDocument({ autoFirstPage: false, compress: true, margin: 0, info: {
  Title: 'Brave Hitter Academy — Chapter 1 Production Proof',
  Author: 'Brave Hitter Academy',
  Subject: 'Deterministic seven-page Chapter 1 production proof',
}});
const stream = fs.createWriteStream(pdfPath);
pdf.pipe(stream);

for (const sourceFile of sourceFiles) {
  const pngPath = path.join(pngDir, path.basename(sourceFile, '.svg') + '.png');
  pdf.addPage({ size: [PAGE.widthPt, PAGE.heightPt], margin: 0 });
  pdf.image(pngPath, 0, 0, { width: PAGE.widthPt, height: PAGE.heightPt });
}
pdf.end();
await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Rendered 7 PNG proofs and a visually matched 300-PPI PDF at ${pdfPath}`);
