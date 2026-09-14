import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import PDFDocument from 'pdfkit';
import { FONT, PAGE } from './production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const base = path.join(root, 'production/pages/confidence-toolkit');
const sourceDir = path.join(base, 'source');
const pngDir = path.join(base, 'png');
const pdfDir = path.join(base, 'pdf');
fs.mkdirSync(pngDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });
const fontFiles = [FONT.displayRenderRegularFile, FONT.displayRenderBoldFile, FONT.bodyRenderRegularFile, FONT.bodyRenderSemiboldFile, FONT.bodyRenderBoldFile].map(file => path.join(root, file));
const sources = Array.from({ length: 6 }, (_, i) => path.join(sourceDir, `confidence_toolkit_page_${String(i + 1).padStart(2, '0')}.svg`));
const requestedPages = process.argv.slice(2).map(Number).filter(page => Number.isInteger(page) && page >= 1 && page <= 6);
const renderSources = requestedPages.length ? requestedPages.map(page => sources[page - 1]) : sources;
for (const source of renderSources) {
  const png = new Resvg(fs.readFileSync(source, 'utf8'), { fitTo: { mode: 'width', value: PAGE.widthPx }, font: { fontFiles, loadSystemFonts: false, defaultFontFamily: FONT.bodyFamily } }).render().asPng();
  fs.writeFileSync(path.join(pngDir, path.basename(source, '.svg') + '.png'), png);
}
const pdfPath = path.join(pdfDir, 'brave-hitter-academy-confidence-toolkit.pdf');
const pdf = new PDFDocument({ autoFirstPage: false, compress: true, margin: 0, info: { Title: 'Brave Hitter Academy — Confidence Toolkit', Author: 'Brave Hitter Academy' } });
const stream = fs.createWriteStream(pdfPath);
pdf.pipe(stream);
for (const source of sources) {
  pdf.addPage({ size: [PAGE.widthPt, PAGE.heightPt], margin: 0 });
  pdf.image(path.join(pngDir, path.basename(source, '.svg') + '.png'), 0, 0, { width: PAGE.widthPt, height: PAGE.heightPt });
}
pdf.end();
await new Promise((resolve, reject) => { stream.on('finish', resolve); stream.on('error', reject); });
console.log(`Rendered Confidence Toolkit pages ${requestedPages.length ? requestedPages.join(', ') : '1–6'} at ${pdfPath}`);
