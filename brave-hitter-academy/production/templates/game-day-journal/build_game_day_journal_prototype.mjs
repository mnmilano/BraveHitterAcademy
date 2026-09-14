import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE, FONT } from '../system/production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const out = path.join(root, 'production/pages/game-day-journal/prototype/source');
fs.mkdirSync(out, { recursive: true });

const assets = { crest: 'assets/brand/crest.png', halftone: 'assets/decorations/halftone.png' };
const data = Object.fromEntries(Object.entries(assets).map(([k,v]) => [k, `data:image/png;base64,${fs.readFileSync(path.join(root,v)).toString('base64')}`]));
const esc = v => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (v,x,y,size=48,o={}) => `<text x="${x}" y="${y}" class="${o.display?'display':'body'}" font-size="${size}" font-weight="${o.weight||(o.display?700:600)}" fill="${o.fill||'#171513'}"${o.anchor?` text-anchor="${o.anchor}"`:''}>${esc(v)}</text>`;
const checkbox = (label,x,y,size=46) => `<rect x="${x}" y="${y-39}" width="43" height="43" rx="5" fill="#fffaf0" stroke="#171513" stroke-width="6"/>${text(label,x+65,y,size)}`;
const rule = (label,x,y,w) => `${text(label,x,y,42,{display:true,fill:'#6a625a'})}<line x1="${x+Math.max(170,label.length*28)}" y1="${y+8}" x2="${x+w}" y2="${y+8}" stroke="#272322" stroke-width="5"/>`;
const panel = (x,y,w,h,title,accent='#c9151e') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="#fffaf0" stroke="${accent}" stroke-width="9"/><path d="M${x} ${y+32}q0-32 32-32h${w-64}q32 0 32 32v82H${x}z" fill="${accent}"/>${text(title,x+48,y+79,55,{display:true,fill:'#fff'})}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3300" height="2550" viewBox="0 0 3300 2550">
<metadata>section:game-day-journal;prototype:game-1-before;source:GAME_DAY_JOURNAL.md#PAGE-A</metadata>
<defs><filter id="grain"><feTurbulence baseFrequency=".75" numOctaves="2" seed="53" type="fractalNoise"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .24 0 0 0 .05 0"/></filter></defs>
<style>.display{font-family:'Oswald';font-weight:700;letter-spacing:2px}.body{font-family:'Source Sans 3'}</style>
<rect width="3300" height="2550" fill="#f5eedf"/><rect width="3300" height="2550" filter="url(#grain)" opacity=".55"/><image href="${data.halftone}" x="2500" y="180" width="800" height="650" opacity=".08"/>
<path d="M0 0h3300v230H0z" fill="#111"/><path d="M0 0h950l120 115-120 115H0z" fill="#c9151e"/><image href="${data.crest}" x="46" y="27" width="170" height="170" preserveAspectRatio="xMidYMid meet"/>
${text('GAME DAY JOURNAL',250,146,76,{display:true,fill:'#fff'})}${text('GAME 1 • BEFORE THE GAME',3165,146,66,{display:true,fill:'#f3b21a',anchor:'end'})}
${rule('DATE:',120,330,900)}${rule('OPPONENT:',1160,330,940)}${rule('LOCATION:',2240,330,940)}
${panel(120,420,980,650,'HOW DO I FEEL?')}
${checkbox('Excited',180,590)}${checkbox('Calm',620,590)}${checkbox('Nervous',180,705)}${checkbox('Tired',620,705)}${checkbox('Confident',180,820)}${checkbox('Other:',620,820)}<line x1="830" y1="830" x2="1020" y2="830" stroke="#272322" stroke-width="4"/>
${text('CONFIDENCE',180,955,47,{display:true,fill:'#c9151e'})}
${[1,2,3,4,5].map((n,i)=>`<circle cx="${565+i*102}" cy="942" r="38" fill="#fff" stroke="#111" stroke-width="6"/>${text(n,565+i*102,960,39,{display:true,anchor:'middle'})}`).join('')}
${panel(1160,420,940,650,'3-BREATH RESET','#111')}
${text('1',1230,605,50,{display:true,fill:'#c9151e'})}${text('Relax my body.',1300,605,49)}
${text('2',1230,755,50,{display:true,fill:'#c9151e'})}${text('Clear my mind.',1300,755,49)}
${text('3',1230,905,50,{display:true,fill:'#c9151e'})}${text('Get ready to compete.',1300,905,49)}
${panel(2160,420,1020,650,'COACH MARK','#c9151e')}
${text('BE READY.',2670,635,76,{display:true,fill:'#111',anchor:'middle'})}${text('BE BRAVE.',2670,760,76,{display:true,fill:'#c9151e',anchor:'middle'})}${text('TAKE YOUR BEST SWING.',2670,885,62,{display:true,fill:'#111',anchor:'middle'})}
${panel(120,1140,1480,1030,"TODAY'S FOCUS")}
${checkbox('Taking my swing',180,1320)}${checkbox('Controlling what I can',180,1435)}${checkbox('Staying positive',180,1550)}${checkbox('Resetting after mistakes',800,1320)}${checkbox('Being a great teammate',800,1435)}${checkbox('Having fun',800,1550)}
${text('MY GOAL',180,1725,48,{display:true,fill:'#c9151e'})}<line x1="180" y1="1805" x2="1520" y2="1805" stroke="#272322" stroke-width="5"/><line x1="180" y1="1920" x2="1520" y2="1920" stroke="#272322" stroke-width="5"/><line x1="180" y1="2035" x2="1520" y2="2035" stroke="#272322" stroke-width="5"/>
${panel(1700,1140,1480,1030,'MY BRAVE HITTER THOUGHT','#111')}
${checkbox("I've got this.",1760,1320)}${checkbox('Trust my swing.',1760,1435)}${checkbox('Next pitch.',1760,1550)}${checkbox('Be brave.',2400,1320)}${checkbox("I've done the work.",2400,1435)}
${text('MY OWN',1760,1725,48,{display:true,fill:'#c9151e'})}<line x1="1760" y1="1805" x2="3100" y2="1805" stroke="#272322" stroke-width="5"/><line x1="1760" y1="1920" x2="3100" y2="1920" stroke="#272322" stroke-width="5"/><line x1="1760" y1="2035" x2="3100" y2="2035" stroke="#272322" stroke-width="5"/>
<path d="M0 2320 Q850 2265 1680 2330 T3300 2300V2550H0z" fill="#111"/><path d="M2500 2320h800v230h-900z" fill="#c9151e"/><circle cx="105" cy="2445" r="53" fill="none" stroke="#ef2530" stroke-width="15"/><path d="M105 2402l13 27 30 4-22 21 5 30-26-14-27 14 6-30-22-21 30-4z" fill="#ef2530"/>${text('BRAVE HITTER ACADEMY',190,2467,45,{display:true,fill:'#fff'})}
</svg>`;

fs.writeFileSync(path.join(out,'game_day_journal_game_01_before.svg'),svg);
const scoreRow = (label,y) => `${text(label,190,y,43)}${[1,2,3,4,5].map((n,i)=>`<circle cx="${875+i*112}" cy="${y-15}" r="34" fill="#fff" stroke="#111" stroke-width="5"/>${text(n,875+i*112,y+2,35,{display:true,anchor:'middle'})}`).join('')}`;
const writingRule = (label,y) => `${text(label,1750,y,41,{weight:600})}<line x1="1750" y1="${y+42}" x2="3100" y2="${y+42}" stroke="#272322" stroke-width="4"/>`;
const afterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="3300" height="2550" viewBox="0 0 3300 2550">
<metadata>section:game-day-journal;prototype:game-1-after;source:GAME_DAY_JOURNAL.md#PAGE-B</metadata>
<defs><filter id="grain"><feTurbulence baseFrequency=".75" numOctaves="2" seed="59" type="fractalNoise"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .24 0 0 0 .05 0"/></filter></defs>
<style>.display{font-family:'Oswald';font-weight:700;letter-spacing:2px}.body{font-family:'Source Sans 3'}</style>
<rect width="3300" height="2550" fill="#f5eedf"/><rect width="3300" height="2550" filter="url(#grain)" opacity=".55"/><image href="${data.halftone}" x="2500" y="180" width="800" height="650" opacity=".08"/>
<path d="M0 0h3300v230H0z" fill="#111"/><path d="M0 0h950l120 115-120 115H0z" fill="#c9151e"/><image href="${data.crest}" x="46" y="27" width="170" height="170" preserveAspectRatio="xMidYMid meet"/>
${text('GAME DAY JOURNAL',250,146,76,{display:true,fill:'#fff'})}${text('GAME 1 • AFTER THE GAME',3165,146,66,{display:true,fill:'#f3b21a',anchor:'end'})}
${rule('FINAL SCORE:',120,330,1050)}${rule('HOW DO I FEEL NOW?',1370,330,1810)}
${panel(120,420,1480,1010,'BRAVE HITTER SCORECARD')}
${text('CIRCLE ONE FOR EACH',1515,500,34,{display:true,fill:'#fff',anchor:'end'})}
${scoreRow('I took my swings',600)}${scoreRow('I competed',730)}${scoreRow('I controlled my attitude',860)}${scoreRow('I reset after mistakes',990)}${scoreRow('I supported teammates',1120)}${scoreRow('I had fun',1250)}
${panel(1700,420,1480,1010,'MY GAME DAY WIN','#111')}
${writingRule('My bravest moment:',590)}${writingRule('My best moment:',750)}${writingRule('One thing I learned:',910)}${writingRule('Next time I will:',1070)}${writingRule('Today was a win because:',1230)}
${panel(120,1500,1480,680,'PARENT DUGOUT')}
${text('ASK:',180,1665,42,{display:true,fill:'#c9151e'})}${text('What was your favorite part?',335,1665,42)}
${text('What are you proud of?',335,1760,42)}${text('What did you learn?',335,1855,42)}
${text('PARENT NOTE',180,1980,41,{display:true,fill:'#c9151e'})}<line x1="500" y1="1990" x2="1510" y2="1990" stroke="#272322" stroke-width="4"/><line x1="180" y1="2090" x2="1510" y2="2090" stroke="#272322" stroke-width="4"/>
${panel(1700,1500,1480,680,'THE RIDE HOME RULE','#c9151e')}
${text('Let your player lead the baseball conversation.',1760,1665,48,{weight:600})}
${text('If they want to talk, listen. If they want to move on,',1760,1770,45)}${text("that's okay.",1760,1845,45)}
${text('The goal is connection—not a post-game',1760,1970,45,{weight:700})}${text('coaching session.',1760,2045,45,{weight:700})}
<path d="M0 2320 Q850 2265 1680 2330 T3300 2300V2550H0z" fill="#111"/><path d="M2080 2320h1220v230H1980z" fill="#c9151e"/><circle cx="105" cy="2445" r="53" fill="none" stroke="#ef2530" stroke-width="15"/><path d="M105 2402l13 27 30 4-22 21 5 30-26-14-27 14 6-30-22-21 30-4z" fill="#ef2530"/>${text('BRAVE HITTER ACADEMY',190,2467,45,{display:true,fill:'#fff'})}${text('BE BRAVE. TAKE YOUR BEST SWING. HAVE FUN.',3230,2462,45,{display:true,fill:'#fff',anchor:'end'})}
</svg>`;
fs.writeFileSync(path.join(out,'game_day_journal_game_01_after.svg'),afterSvg);
fs.writeFileSync(path.join(out,'build-manifest.json'),JSON.stringify({section:'Game Day Journal',prototype:'Game 1 Before and After the Game',source:'GAME_DAY_JOURNAL.md#PAGE-A-B',pageCount:2,pagePx:[PAGE.widthPx,PAGE.heightPx],pagePt:[PAGE.widthPt,PAGE.heightPt],assets,fonts:FONT},null,2)+'\n');
console.log(`Wrote Game Day Journal prototype to ${out}`);
