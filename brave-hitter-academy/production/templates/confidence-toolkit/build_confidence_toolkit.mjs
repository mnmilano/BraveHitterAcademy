import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE, FONT } from '../system/production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const out = path.join(root, 'production/pages/confidence-toolkit/source');
fs.mkdirSync(out, { recursive: true });

const assetPaths = {
  crest: 'assets/brand/crest.png',
  gioReady: 'assets/gio/gio_ready_righty.png',
  gioReflect: 'assets/gio/gio_reflect.png',
  gioCelebrate: 'assets/gio/gio_celebrate.png',
  coach: 'assets/coach-mark/coach_mark_canonical.png',
  halftone: 'assets/decorations/halftone.png',
  dirt: 'assets/decorations/dirt.png',
  burst: 'assets/decorations/burst.png',
};
const data = Object.fromEntries(Object.entries(assetPaths).map(([key, rel]) => [key, `data:image/png;base64,${fs.readFileSync(path.join(root, rel)).toString('base64')}`]));
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (value, x, y, size = 48, options = {}) => `<text x="${x}" y="${y}" class="${options.display ? 'display' : 'body'}" font-size="${size}" font-weight="${options.weight || (options.display ? 700 : 600)}" fill="${options.fill || '#171513'}"${options.anchor ? ` text-anchor="${options.anchor}"` : ''}${options.italic ? ' font-style="italic"' : ''}>${esc(value)}</text>`;
const lines = (values, x, y, size = 48, step = 66, options = {}) => values.map((value, i) => text(value, x, y + i * step, size, options)).join('');
const img = (key, x, y, w, h, opacity = 1) => `<image href="${data[key]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" opacity="${opacity}"/>`;
const writingLine = (x, y, w) => `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="#272322" stroke-width="5"/>`;
const checkbox = (x, y, label) => `<rect x="${x}" y="${y - 50}" width="62" height="62" rx="8" fill="#fffaf0" stroke="#c9151e" stroke-width="7"/>${text(label, x + 92, y, 55)}`;
const bullet = (x, y, label, color = '#c9151e', size = 46) => `<circle cx="${x}" cy="${y - 16}" r="13" fill="${color}"/>${text(label, x + 38, y, size)}`;
const card = (x, y, w, h, title, body, options = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="${options.dark ? '#111' : '#fffaf0'}" stroke="${options.stroke || '#c9151e'}" stroke-width="10"/><path d="M${x} ${y}h${w}v112H${x}z" fill="${options.header || '#c9151e'}"/>${text(title, x + 38, y + 78, options.titleSize || 56, { display: true, fill: '#fff' })}${body}`;
const footer = `<path d="M0 2380 Q900 2315 1660 2385 T3300 2360V2550H0z" fill="#111"/><path d="M2550 2380h750v170H2455z" fill="#c9151e"/><circle cx="105" cy="2463" r="53" fill="none" stroke="#ef2530" stroke-width="15"/><path d="M105 2420l13 27 30 4-22 21 5 30-26-14-27 14 6-30-22-21 30-4z" fill="#ef2530"/>${text('BRAVE HITTER ACADEMY', 190, 2485, 45, { display: true, fill: '#fff' })}`;
function base(page, title, subtitle = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="3300" height="2550" viewBox="0 0 3300 2550"><metadata>section:confidence-toolkit;page:${page};source:CONFIDENCE_TOOLKIT.md#PAGE-${page}</metadata><defs><filter id="grain"><feTurbulence baseFrequency=".75" numOctaves="2" seed="31" type="fractalNoise"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .24 0 0 0 .05 0"/></filter></defs><style>.display{font-family:'Oswald';font-weight:700;letter-spacing:2px}.body{font-family:'Source Sans 3'}</style><rect width="3300" height="2550" fill="#f5eedf"/><rect width="3300" height="2550" filter="url(#grain)" opacity=".55"/><path d="M0 0h3300v190H0z" fill="#111"/><path d="M0 0h800l105 95-105 95H0z" fill="#c9151e"/>${img('crest', 45, 24, 150, 150)}${text('CONFIDENCE TOOLKIT', 230, 128, 66, { display: true, fill: '#fff' })}${text(title, 950, 127, 65, { display: true, fill: '#fff' })}${subtitle ? text(subtitle, 3180, 125, 32, { fill: '#f3b21a', anchor: 'end' }) : ''}${footer}`;
}
const end = '</svg>';
const pages = [];

pages[1] = base(1, 'YOUR CONFIDENCE TOOLKIT', 'PICK THE TOOL THAT MATCHES THE MOMENT') +
  `${text('USE THESE TOOLS WHENEVER BASEBALL FEELS DIFFICULT.', 140, 350, 58, { display: true, fill: '#c9151e' })}` +
  card(120, 430, 1840, 470, 'HOW TO USE IT', lines([
    'You do not need every tool at once. Pick the one that matches the moment.',
    'Before a game, use a preparation tool. After a mistake, use a reset tool.',
    'When confidence drops, use a courage tool.',
    'The goal is not to erase every nervous feeling. Know what to do next.'
  ], 170, 590, 46, 72)) +
  `${img('burst', 2180, 310, 900, 900, .16)}${img('gioReflect', 2310, 330, 680, 1030)}` +
  card(120, 1010, 960, 1080, 'TOOL 1 — VISUALIZATION', lines(['Picture a confident', 'at-bat before it happens.', '', 'See the pitch.', 'See your load.', 'See a Brave Swing.'], 175, 1210, 64, 118), { header: '#111', stroke: '#111', titleSize: 50 }) +
  card(1170, 1010, 960, 1080, 'TOOL 2 — NEXT PITCH', lines(['Breathe.', 'Learn one thing.', 'Let it go.', '', 'Return your attention to', 'the next opportunity.'], 1225, 1210, 64, 118), { titleSize: 54 }) +
  card(2220, 1010, 960, 1080, 'TOOL 3 — BRAVE SWINGS', lines(['Reward committed', 'swings at good pitches.'], 2275, 1210, 64, 118) + `<path d="M2275 1660h775v290h-775z" fill="#c9151e"/>${lines(['COURAGE FIRST.', 'RESULTS SECOND.'], 2662, 1770, 70, 94, { display: true, fill: '#fff', anchor: 'middle' })}`, { header: '#111', stroke: '#111', titleSize: 50 }) + end;

pages[2] = base(2, 'SEE IT EARLY. HIT IT HARD.', 'FOCUS ON WHAT YOU CAN CONTROL') +
  card(120, 300, 1430, 1510, 'TOOL 4 — FAST PITCH HERO',
    `${text('WHAT IT IS', 175, 485, 55, { display: true, fill: '#c9151e' })}${lines(['A simple attention tool for facing', 'faster pitching.'], 175, 570, 51, 72)}` +
    `${text('WHY IT WORKS', 175, 770, 55, { display: true, fill: '#c9151e' })}${lines(['Fear makes you focus on speed. Tracking the', 'release point gives your brain useful information.'], 175, 855, 51, 72)}` +
    `${text('HOW TO DO IT', 175, 1060, 55, { display: true, fill: '#c9151e' })}${lines(['Get ready early. Find the pitcher’s release point.', 'Track the ball as long as you can.'], 175, 1145, 51, 72)}` +
    `<rect x="170" y="1360" width="1330" height="390" rx="28" fill="#111"/>${text('GIO’S EXAMPLE', 225, 1465, 55, { display: true, fill: '#f3b21a' })}${lines(['Instead of thinking “He’s too fast,”', 'Gio tells himself: “Early eyes.”'], 225, 1575, 55, 82, { fill: '#fff' })}`) +
  card(1650, 300, 1530, 1510, 'TOOL 5 — HARD CONTACT CHALLENGE',
    `${text('WHAT IT IS', 1705, 485, 55, { display: true, fill: '#c9151e' })}${lines(['Judge the quality of contact instead of', 'whether the ball becomes a hit.'], 1705, 570, 51, 72)}` +
    `${text('WHY IT WORKS', 1705, 770, 55, { display: true, fill: '#c9151e' })}${lines(['Fielders and luck affect hits. Your pitch choice', 'and swing quality are more controllable.'], 1705, 855, 51, 72)}` +
    `${text('HOW TO DO IT', 1705, 1060, 55, { display: true, fill: '#c9151e' })}${lines(['Count line drives and well-struck balls', 'in practice or games.'], 1705, 1145, 51, 72)}` +
    `<rect x="1750" y="1360" width="1330" height="390" rx="28" fill="#c9151e"/>${text('GIO’S EXAMPLE', 1805, 1465, 55, { display: true, fill: '#fff' })}${lines(['A line drive caught by the shortstop still', 'earns credit for hard contact.'], 1805, 1575, 55, 82, { fill: '#fff' })}`) +
  `<rect x="120" y="1900" width="3060" height="330" rx="35" fill="#111"/>${img('coach', 140, 1840, 410, 440)}${text('COACH MARK’S QUICK CHECK', 560, 2000, 58, { display: true, fill: '#f3b21a' })}${text('FAST PITCH? → EARLY EYES.', 560, 2090, 47, { display: true, fill: '#fff' })}${text('WORRIED ABOUT YOUR AVERAGE? → CHASE HARD CONTACT.', 560, 2170, 47, { display: true, fill: '#fff' })}` + end;

pages[3] = base(3, 'THE CONFIDENCE JOURNAL', 'NOTICE EVIDENCE OF YOUR PROGRESS') +
  `<path d="M0 190h1120l-150 2190H0z" fill="#111"/>${img('halftone', 0, 190, 1150, 2190, .12)}${img('gioReflect', 190, 480, 650, 1160)}` +
  `${text('CONFIDENCE GROWS', 90, 385, 74, { display: true, fill: '#f3b21a' })}${text('WHEN YOU NOTICE', 90, 475, 74, { display: true, fill: '#fff' })}${text('YOUR PROGRESS.', 90, 565, 74, { display: true, fill: '#fff' })}` +
  `${text('WHAT IT IS', 1160, 360, 58, { display: true, fill: '#c9151e' })}${lines(['A short record of things you did well, learned, or handled bravely.', 'This is not a batting-average tracker. It is evidence that you are growing.'], 1160, 440, 45, 70)}` +
  `${text('WHEN TO USE IT', 1160, 670, 58, { display: true, fill: '#c9151e' })}${bullet(1190, 755, 'After practice')}${bullet(1190, 835, 'After a game')}${bullet(1190, 915, 'After a difficult baseball day')}${bullet(1190, 995, 'Any time your brain says, “I’m not getting better.”')}` +
  `<rect x="1110" y="1080" width="2070" height="270" rx="28" fill="#c9151e"/>${text('THE 3-WIN RULE', 1180, 1185, 62, { display: true, fill: '#fff' })}${lines(['Write three wins. A win can be effort, courage, a good decision,', 'a reset, hard contact, or helping a teammate.'], 1180, 1270, 45, 62, { fill: '#fff' })}` +
  `${text('MY THREE WINS TODAY', 1160, 1500, 62, { display: true })}${text('1.', 1170, 1620, 48, { display: true, fill: '#c9151e' })}${writingLine(1240, 1630, 1840)}${text('2.', 1170, 1745, 48, { display: true, fill: '#c9151e' })}${writingLine(1240, 1755, 1840)}${text('3.', 1170, 1870, 48, { display: true, fill: '#c9151e' })}${writingLine(1240, 1880, 1840)}${text('SOMETHING I LEARNED', 1160, 2040, 48, { display: true, fill: '#c9151e' })}${writingLine(1160, 2160, 1920)}` + end;

pages[4] = base(4, 'YOUR SUPERPOWER ROUTINE', 'MAKE READY FEEL FAMILIAR') +
  `${text('A REPEATABLE ROUTINE GIVES YOUR BRAIN SOMETHING FAMILIAR TO DO.', 140, 350, 54, { display: true, fill: '#c9151e' })}` +
  card(120, 440, 1750, 870, 'BUILD YOUR ROUTINE',
    [['1', 'BREATHE', 'One slow breath.'], ['2', 'FOCUS', 'Pick one simple cue.'], ['3', 'SEE', 'Look at the pitcher and find the ball.'], ['4', 'TRUST', 'Step in ready to compete.']].map((a, i) => `<circle cx="220" cy="${650 + i * 155}" r="55" fill="${i % 2 ? '#111' : '#c9151e'}"/>${text(a[0], 220, 670 + i * 155, 54, { display: true, fill: '#fff', anchor: 'middle' })}${text(a[1], 310, 645 + i * 155, 59, { display: true, fill: '#c9151e' })}${text(a[2], 310, 710 + i * 155, 50)}`).join('') + text('Keep it short enough to repeat before every at-bat.', 310, 1250, 42, { italic: true })) +
  `${img('burst', 2070, 350, 950, 950, .18)}${text('KEEP IT SHORT.', 2555, 450, 58, { display: true, fill: '#c9151e', anchor: 'middle' })}${img('gioReady', 2200, 440, 650, 900)}` +
  card(120, 1430, 1750, 690, 'CHOOSE YOUR FOCUS PHRASE', `${checkbox(180, 1630, 'See it. Trust it.')}${checkbox(180, 1750, 'Early eyes.')}${checkbox(180, 1870, 'Take my swing.')}${checkbox(990, 1630, 'Be brave.')}${checkbox(990, 1750, 'I’ve done the work.')}${checkbox(990, 1870, 'My own:')}${writingLine(1325, 1870, 415)}`) +
  `<rect x="1980" y="1460" width="1150" height="650" rx="32" fill="#c9151e"/>${text('GIO’S ROUTINE', 2040, 1575, 64, { display: true, fill: '#fff' })}${lines(['Breathe → look at the barrel →', '“See it. Trust it.” → eyes to the', 'pitcher → compete.'], 2040, 1690, 55, 82, { fill: '#fff' })}${text('COACH MARK SAYS', 2040, 1940, 52, { display: true, fill: '#f3b21a' })}${lines(['A routine doesn’t guarantee a hit.', 'It gets you ready for your opportunity.'], 2040, 2010, 44, 54, { fill: '#fff' })}` + end;

pages[5] = base(5, 'POSITIVE TEAMMATE LEADERSHIP', 'MAKE SOMEONE ELSE BETTER') +
  `${text('CONFIDENCE GETS STRONGER WHEN YOU HELP SOMEONE ELSE COMPETE.', 140, 350, 56, { display: true, fill: '#c9151e' })}` +
  card(120, 440, 1540, 770, 'THREE WAYS TO LEAD',
    [['1', 'ENCOURAGE', 'Help a teammate after a mistake.'], ['2', 'CELEBRATE', 'Be genuinely excited when someone else succeeds.'], ['3', 'HELP', 'Find something useful to do without being asked.']].map((a, i) => `<circle cx="220" cy="${650 + i * 175}" r="58" fill="${i === 1 ? '#111' : '#c9151e'}"/>${text(a[0], 220, 672 + i * 175, 52, { display: true, fill: '#fff', anchor: 'middle' })}${text(a[1], 320, 640 + i * 175, 54, { display: true, fill: '#c9151e' })}${text(a[2], 320, 708 + i * 175, 43)}`).join('') + text('You do not need to be the captain or best player to lead.', 175, 1160, 39, { italic: true })) +
  `<rect x="1760" y="440" width="1420" height="770" rx="32" fill="#c9151e"/>${img('coach', 2050, 455, 830, 570)}${text('COACH MARK SAYS', 2470, 1050, 52, { display: true, fill: '#f3b21a', anchor: 'middle' })}${text('Great teammates change the energy around them.', 2470, 1135, 42, { fill: '#fff', anchor: 'middle' })}` +
  card(120, 1325, 3060, 790, 'TRY THESE PHRASES', `${['“Next pitch—you’ve got this.”', '“Great swing.”', '“Keep competing.”', '“We’ll get the next one.”', '“Nice job staying with it.”'].map((v, i) => { const col = i % 2, row = Math.floor(i / 2), x = 210 + col * 1450, y = 1555 + row * 145; return `<circle cx="${x}" cy="${y - 17}" r="16" fill="#c9151e"/>${text(v, x + 48, y, 55)}`; }).join('')}${text('Use words that help teammates return to ready.', 190, 2045, 48, { fill: '#c9151e', italic: true })}`) + end;

pages[6] = base(6, 'MY BRAVE HITTER RESET CARD', 'WHEN YOU DON’T KNOW WHAT TO DO, START HERE') +
  `${[
    ['I’M NERVOUS', ['One slow breath.', 'Pick one focus phrase.', 'Find the ball.', 'Take your best swing.']],
    ['I MADE A MISTAKE', ['Feel it.', 'Learn one thing.', 'Say “Next pitch.”', 'Return to ready.']],
    ['THE PITCHER IS FAST', ['Get ready earlier.', 'Find the release point.', 'Track the ball.', 'Trust your swing.']],
    ['I’M NOT GETTING HITS', ['Stop chasing hits.', 'Hunt good pitches.', 'Track hard contact.', 'Write three wins.']],
    ['I’M LOSING CONFIDENCE', ['Read your Confidence Journal.', 'Remember your preparation.', 'Do one brave thing.', 'Confidence follows courage.']],
    ['MY TEAMMATE IS DOWN', ['Notice them.', 'Encourage them.', 'Celebrate their next brave action.', 'Help them reset.']]
  ].map((entry, i) => { const col = i % 3, row = Math.floor(i / 3), x = 120 + col * 1030, y = 325 + row * 910; return card(x, y, 930, 800, entry[0], entry[1].map((v, j) => `<circle cx="${x + 92}" cy="${y + 210 + j * 138}" r="41" fill="${j % 2 ? '#111' : '#c9151e'}"/>${text(String(j + 1), x + 92, y + 229 + j * 138, 42, { display: true, fill: '#fff', anchor: 'middle' })}${text(v, x + 160, y + 229 + j * 138, v.length > 30 ? 44 : v.length > 24 ? 48 : 54)}`).join(''), { header: i % 2 ? '#111' : '#c9151e', stroke: i % 2 ? '#111' : '#c9151e', titleSize: entry[0].length > 20 ? 50 : 60 }); }).join('')}` + end;

for (let i = 1; i <= 6; i++) fs.writeFileSync(path.join(out, `confidence_toolkit_page_${String(i).padStart(2, '0')}.svg`), pages[i]);
fs.writeFileSync(path.join(out, 'build-manifest.json'), JSON.stringify({ section: 'Confidence Toolkit', source: 'CONFIDENCE_TOOLKIT.md', pageCount: 6, pagePx: [PAGE.widthPx, PAGE.heightPx], pagePt: [PAGE.widthPt, PAGE.heightPt], assets: assetPaths, fonts: FONT }, null, 2) + '\n');
console.log(`Wrote 6 Confidence Toolkit SVG pages to ${out}`);
