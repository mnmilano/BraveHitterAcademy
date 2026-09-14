import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { CHAPTER_FAMILIES, FONT, PAGE } from './production-config.mjs';
import { PROHIBITED_TEXT, REQUIRED_TEXT } from './chapter1-qc.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.resolve(here, '..');
const root = path.resolve(templatesDir, '../..');
const base = path.join(root, 'production/pages/chapter-01');
const sourceDir = path.join(base, 'source');
const pngDir = path.join(base, 'png');
const pdfPath = path.join(base, 'pdf/brave-hitter-academy-chapter-01.pdf');
const failures = [];
const results = [];

function check(condition, label) {
  results.push({ label, status: condition ? 'PASS' : 'FAIL' });
  if (!condition) failures.push(label);
}

function pngDimensions(buffer) {
  const signature = buffer.subarray(1, 4).toString('ascii');
  if (signature !== 'PNG') throw new Error('Not a PNG');
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

const manifest = JSON.parse(fs.readFileSync(path.join(sourceDir, 'build-manifest.json'), 'utf8'));
check(manifest.families.join('|') === CHAPTER_FAMILIES.join('|'), 'Seven page families are present in locked order');
check(manifest.pagePx[0] === PAGE.widthPx && manifest.pagePx[1] === PAGE.heightPx, 'Manifest pixel geometry is 3300 × 2550');
check(manifest.pagePt[0] === PAGE.widthPt && manifest.pagePt[1] === PAGE.heightPt, 'Manifest PDF geometry is 792 × 612 points');
check(Object.values(manifest.assets).every((value) => !/production\/staging/i.test(value)), 'Manifest contains no staging asset dependency');
check(Object.values(manifest.assets).every((value) => fs.existsSync(path.join(root, value))), 'Every declared production asset exists');
check(Object.values(FONT).filter((value) => typeof value === 'string' && /\.(?:ttf|otf|woff2?)$/i.test(value)).every((value) => fs.existsSync(path.join(root, value))), 'Every locked font file exists');

const hashes = [];
for (let index = 0; index < 7; index += 1) {
  const page = index + 1;
  const svgPath = path.join(sourceDir, `chapter_1_page_${page}.svg`);
  const pngPath = path.join(pngDir, `chapter_1_page_${page}.png`);
  check(fs.existsSync(svgPath), `Page ${page} editable SVG exists`);
  check(fs.existsSync(pngPath), `Page ${page} PNG proof exists`);
  if (!fs.existsSync(svgPath) || !fs.existsSync(pngPath)) continue;
  const svg = fs.readFileSync(svgPath, 'utf8');
  const png = fs.readFileSync(pngPath);
  check(svg.includes(`family:${CHAPTER_FAMILIES[index]}`), `Page ${page} family metadata is correct`);
  check(/width="3300" height="2550" viewBox="0 0 3300 2550"/.test(svg), `Page ${page} SVG geometry is exact`);
  check(REQUIRED_TEXT[index].every((text) => svg.includes(text)), `Page ${page} contains required authoritative text anchors`);
  check(PROHIBITED_TEXT.every((pattern) => !pattern.test(svg)), `Page ${page} contains no prohibited legacy/staging text`);
  const [width, height] = pngDimensions(png);
  check(width === PAGE.widthPx && height === PAGE.heightPx, `Page ${page} PNG geometry is 3300 × 2550`);
  hashes.push({
    page,
    family: CHAPTER_FAMILIES[index],
    svgSha256: crypto.createHash('sha256').update(svg).digest('hex'),
    pngSha256: crypto.createHash('sha256').update(png).digest('hex'),
  });
}

check(fs.existsSync(pdfPath), 'Seven-page PDF proof exists');
if (fs.existsSync(pdfPath)) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdf = await PDFDocument.load(pdfBytes);
  check(pdf.getPageCount() === 7, 'PDF contains exactly seven pages');
  for (const [index, page] of pdf.getPages().entries()) {
    const { width, height } = page.getSize();
    check(Math.abs(width - PAGE.widthPt) < 0.01 && Math.abs(height - PAGE.heightPt) < 0.01, `PDF page ${index + 1} is 792 × 612 points`);
  }
  check(pdfBytes.length > 5_000_000, 'PDF contains full-resolution page imagery');
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'FAIL' : 'PASS',
  results,
  hashes,
  failures,
};
fs.writeFileSync(path.join(base, 'preflight.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`${report.status}: ${results.length - failures.length}/${results.length} checks passed`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exitCode = 1;
}
