import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { PAGE, FONT } from './production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const base = path.join(root, 'production/pages/confidence-toolkit');
const src = path.join(base, 'source');
const png = path.join(base, 'png');
const pdfPath = path.join(base, 'pdf/brave-hitter-academy-confidence-toolkit.pdf');
const failures = [], results = [], hashes = [];
const check = (ok, label) => { results.push({ label, status: ok ? 'PASS' : 'FAIL' }); if (!ok) failures.push(label); };
const dims = buffer => [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
const manifest = JSON.parse(fs.readFileSync(path.join(src, 'build-manifest.json')));
const anchors = ['YOUR CONFIDENCE TOOLKIT', 'SEE IT EARLY. HIT IT HARD.', 'THE CONFIDENCE JOURNAL', 'YOUR SUPERPOWER ROUTINE', 'POSITIVE TEAMMATE LEADERSHIP', 'MY BRAVE HITTER RESET CARD'];
const required = [['TOOL 1', 'TOOL 2', 'TOOL 3'], ['TOOL 4', 'TOOL 5', 'EARLY EYES', 'HARD CONTACT'], ['THE 3-WIN RULE', 'MY THREE WINS TODAY'], ['BREATHE', 'FOCUS', 'SEE', 'TRUST', 'GIO’S ROUTINE'], ['ENCOURAGE', 'CELEBRATE', 'HELP', 'TRY THESE PHRASES'], ['I’M NERVOUS', 'I MADE A MISTAKE', 'THE PITCHER IS FAST', 'I’M NOT GETTING HITS', 'I’M LOSING CONFIDENCE', 'MY TEAMMATE IS DOWN']];
check(manifest.pageCount === 6, 'Manifest declares 6 pages');
check(Object.values(manifest.assets).every(value => fs.existsSync(path.join(root, value))), 'Every declared asset exists');
check(Object.values(manifest.assets).every(value => !/production\/staging/i.test(value)), 'No staging dependencies');
check(Object.values(FONT).filter(value => typeof value === 'string' && /\.(ttf|otf|woff2?)$/i.test(value)).every(value => fs.existsSync(path.join(root, value))), 'Every locked font exists');
for (let i = 1; i <= 6; i++) {
  const stem = `confidence_toolkit_page_${String(i).padStart(2, '0')}`;
  const svgPath = path.join(src, stem + '.svg');
  const pngPath = path.join(png, stem + '.png');
  check(fs.existsSync(svgPath), `Page ${i} SVG exists`);
  check(fs.existsSync(pngPath), `Page ${i} PNG exists`);
  if (!fs.existsSync(svgPath) || !fs.existsSync(pngPath)) continue;
  const svg = fs.readFileSync(svgPath, 'utf8');
  const markup = svg.replace(/data:image\/png;base64,[A-Za-z0-9+/=]+/g, '[image]');
  const pngBytes = fs.readFileSync(pngPath);
  check(svg.includes(`page:${i}`), `Page ${i} metadata is correct`);
  check(svg.includes(anchors[i - 1]), `Page ${i} contains authoritative title`);
  check(required[i - 1].every(value => svg.includes(value)), `Page ${i} contains required source anchors`);
  check(!/(Jake|Coach Mike|Page \d+ of|spiral|coil binding|Hall of Fame|#7|MLB|Cincinnati)/i.test(markup), `Page ${i} contains no prohibited legacy text`);
  const [w, h] = dims(pngBytes);
  check(w === PAGE.widthPx && h === PAGE.heightPx, `Page ${i} PNG is 3300 × 2550`);
  hashes.push({ page: i, svgSha256: crypto.createHash('sha256').update(svg).digest('hex'), pngSha256: crypto.createHash('sha256').update(pngBytes).digest('hex') });
}
check(fs.existsSync(pdfPath), 'Confidence Toolkit PDF exists');
if (fs.existsSync(pdfPath)) {
  const bytes = fs.readFileSync(pdfPath);
  const pdf = await PDFDocument.load(bytes);
  check(pdf.getPageCount() === 6, 'PDF has 6 pages');
  for (const [i, page] of pdf.getPages().entries()) {
    const { width, height } = page.getSize();
    check(Math.abs(width - PAGE.widthPt) < .01 && Math.abs(height - PAGE.heightPt) < .01, `PDF page ${i + 1} is 792 × 612 points`);
  }
  check(bytes.length > 3_000_000, 'PDF contains full-resolution imagery');
}
const report = { generatedAt: new Date().toISOString(), status: failures.length ? 'FAIL' : 'PASS', results, hashes, failures };
fs.writeFileSync(path.join(base, 'preflight.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`${report.status}: ${results.length - failures.length}/${results.length} checks passed`);
if (failures.length) { for (const failure of failures) console.error(`FAIL: ${failure}`); process.exitCode = 1; }
