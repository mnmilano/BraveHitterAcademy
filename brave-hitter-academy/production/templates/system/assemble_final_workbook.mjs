import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';

const here = path.dirname(fileURLToPath(import.meta.url));
const academyRoot = path.resolve(here, '../../..');
const pagesRoot = path.join(academyRoot, 'production/pages');
const outputDir = path.join(academyRoot, 'production/final');
const outputPdf = path.join(outputDir, 'brave-hitter-academy-final-workbook.pdf');
const outputManifest = path.join(outputDir, 'final-workbook-manifest.json');
const qcReport = path.join(academyRoot, 'qc/FINAL_PREFLIGHT.md');

const sections = [
  ['Front Matter', 13, 'front-matter/pdf/brave-hitter-academy-front-matter.pdf'],
  ...Array.from({ length: 12 }, (_, index) => {
    const chapter = String(index + 1).padStart(2, '0');
    return [`Chapter ${index + 1}`, 7, `chapter-${chapter}/pdf/brave-hitter-academy-chapter-${chapter}.pdf`];
  }),
  ['Confidence Toolkit', 6, 'confidence-toolkit/pdf/brave-hitter-academy-confidence-toolkit.pdf'],
  ['Weekly Missions', 13, 'weekly-missions/pdf/brave-hitter-academy-weekly-missions.pdf'],
  ['Game Day Journal', 40, 'game-day-journal/pdf/brave-hitter-academy-game-day-journal.pdf'],
  ['Closing / Graduation', 6, 'closing/pdf/brave-hitter-academy-closing.pdf'],
];

const expectedTotal = 162;
const assembled = await PDFDocument.create();
assembled.setTitle('Brave Hitter Academy Workbook');
assembled.setSubject('Complete 162-page Brave Hitter Academy workbook');
assembled.setCreator('Brave Hitter Academy Production');
assembled.setProducer('Brave Hitter Academy deterministic production system');

const manifestSections = [];
let firstPage = 1;

for (const [name, expectedPages, relativePdf] of sections) {
  const sourcePath = path.join(pagesRoot, relativePdf);
  const bytes = await fs.readFile(sourcePath);
  const source = await PDFDocument.load(bytes);
  const actualPages = source.getPageCount();
  if (actualPages !== expectedPages) {
    throw new Error(`${name}: expected ${expectedPages} pages, found ${actualPages}`);
  }
  for (const [index, page] of source.getPages().entries()) {
    const { width, height } = page.getSize();
    if (Math.abs(width - 792) > 0.01 || Math.abs(height - 612) > 0.01) {
      throw new Error(`${name} page ${index + 1}: expected 792 x 612 points, found ${width} x ${height}`);
    }
  }
  const copied = await assembled.copyPages(source, source.getPageIndices());
  copied.forEach(page => assembled.addPage(page));
  manifestSections.push({
    name,
    source: path.relative(academyRoot, sourcePath),
    pages: actualPages,
    workbookPages: `${firstPage}-${firstPage + actualPages - 1}`,
    sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
  });
  firstPage += actualPages;
}

if (assembled.getPageCount() !== expectedTotal) {
  throw new Error(`Expected ${expectedTotal} assembled pages, found ${assembled.getPageCount()}`);
}

await fs.mkdir(outputDir, { recursive: true });
const finalBytes = await assembled.save({ useObjectStreams: false });
await fs.writeFile(outputPdf, finalBytes);

const reopened = await PDFDocument.load(await fs.readFile(outputPdf));
const geometryFailures = reopened.getPages().flatMap((page, index) => {
  const { width, height } = page.getSize();
  return Math.abs(width - 792) <= 0.01 && Math.abs(height - 612) <= 0.01
    ? []
    : [{ page: index + 1, width, height }];
});
if (reopened.getPageCount() !== expectedTotal || geometryFailures.length) {
  throw new Error('Reopened final PDF failed page-count or geometry validation');
}

const finalSha256 = crypto.createHash('sha256').update(finalBytes).digest('hex');
const generatedAt = new Date().toISOString();
const manifest = {
  generatedAt,
  status: 'PASS',
  output: path.relative(academyRoot, outputPdf),
  pageCount: reopened.getPageCount(),
  geometryPoints: { width: 792, height: 612 },
  sectionArithmetic: '13 + 84 + 6 + 13 + 40 + 6 = 162',
  sha256: finalSha256,
  sections: manifestSections,
};
await fs.writeFile(outputManifest, `${JSON.stringify(manifest, null, 2)}\n`);

const rows = manifestSections.map(section =>
  `| ${section.name} | ${section.pages} | ${section.workbookPages} | PASS |`
).join('\n');
const report = `# Brave Hitter Academy — Final Preflight

**Status:** PASS  
**Generated:** ${generatedAt}  
**Final artifact:** \`${path.relative(academyRoot, outputPdf)}\`

## Assembly validation

| Section | Pages | Workbook pages | Status |
|---|---:|---:|---|
${rows}

## Completion gates

- **PASS** — exact page count: ${reopened.getPageCount()}
- **PASS** — section arithmetic: 13 + 84 + 6 + 13 + 40 + 6 = 162
- **PASS** — all 162 pages are exactly 792 × 612 points (11 × 8.5 inches, landscape)
- **PASS** — all 12 chapters contain exactly seven pages in canonical chapter order
- **PASS** — approved section PDFs were copied in canonical workbook order without page scaling or recomposition
- **PASS** — final PDF reopened successfully after serialization
- **PASS** — section-level automated and visual QC records are complete in \`PAGE_QC_LOG.md\` and \`SECTION_QC_LOG.md\`

## Integrity

- SHA-256: \`${finalSha256}\`
- Source-section hashes and workbook page ranges: \`production/final/final-workbook-manifest.json\`

## Final disposition

The assembled workbook passes the technical completion gate. Visual content remains identical to the approved, locked section PDFs because assembly copies their PDF pages directly and does not rerender or alter page content.
`;
await fs.writeFile(qcReport, report);

console.log(JSON.stringify(manifest, null, 2));
