import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapter2 } from './chapter2-content.mjs';
import { CHAPTER_FAMILIES, FONT, PAGE } from '../system/production-config.mjs';

const here=path.dirname(fileURLToPath(import.meta.url)); const root=path.resolve(here,'../../..');
const chapter1=path.join(root,'production/pages/chapter-01/source'); const outDir=path.join(root,'production/pages/chapter-02/source'); fs.mkdirSync(outDir,{recursive:true});
const oldStory=fs.readFileSync(path.join(root,'assets/story/chapter-1/story_part_2.png')).toString('base64');
const newStory=fs.readFileSync(path.join(root,'assets/story/chapter-2/story_part_2.png')).toString('base64');
const esc=v=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(let page=1;page<=7;page+=1){let svg=fs.readFileSync(path.join(chapter1,`chapter_1_page_${page}.svg`),'utf8').replace('source:APPROVED_STORYLINE.md#CHAPTER-1',`source:${chapter2.source}`).replace(oldStory,newStory);let index=0;svg=svg.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g,(match,open,old,close)=>{const replacement=chapter2.pageText[page-1][index];if(replacement===undefined)throw new Error(`Missing text p${page} n${index}`);index+=1;return `${open}${esc(replacement)}${close}`;});if(index!==chapter2.pageText[page-1].length)throw new Error(`Text count mismatch p${page}: ${index}`);fs.writeFileSync(path.join(outDir,`chapter_2_page_${page}.svg`),svg);}
const prior=JSON.parse(fs.readFileSync(path.join(chapter1,'build-manifest.json'),'utf8')); const assets={...prior.assets,story2:'assets/story/chapter-2/story_part_2.png'};
fs.writeFileSync(path.join(outDir,'build-manifest.json'),`${JSON.stringify({chapter:2,title:chapter2.title,source:chapter2.source,pagePx:[PAGE.widthPx,PAGE.heightPx],pagePt:[PAGE.widthPt,PAGE.heightPt],families:CHAPTER_FAMILIES,assets,fonts:FONT},null,2)}\n`);
console.log(`Wrote 7 Chapter 2 SVG pages to ${outDir}`);
