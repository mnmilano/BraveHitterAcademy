import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTER_FAMILIES, COLOR, FONT, PAGE } from '../system/production-config.mjs';
import { chapter1 } from './chapter1-content.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const outDir = path.join(root, 'production/pages/chapter-01/source');
fs.mkdirSync(outDir, { recursive: true });

const W = PAGE.widthPx;
const H = PAGE.heightPx;
const C = {
  red: COLOR.red,
  red2: COLOR.redBright,
  black: COLOR.black,
  charcoal: COLOR.charcoal,
  cream: COLOR.cream,
  cream2: COLOR.creamLight,
  white: COLOR.white,
  gold: COLOR.gold,
  gray: COLOR.gray,
};

const assets = {
  crest: 'assets/brand/crest.png',
  gio: 'assets/gio/gio_canonical.png',
  gioReady: 'assets/gio/gio_ready_righty.png',
  gioReflect: 'assets/gio/gio_reflect.png',
  gioCelebrate: 'assets/gio/gio_celebrate.png',
  coach: 'assets/coach-mark/coach_mark_canonical.png',
  daytime: 'assets/environments/daytime_field.png',
  dugout: 'assets/environments/dugout_interior.png',
  cage: 'assets/environments/sunset_batting_cage.png',
  redbrush: 'assets/decorations/redbrush.png',
  blackbrush: 'assets/decorations/blackbrush.png',
  halftone: 'assets/decorations/halftone.png',
  dirt: 'assets/decorations/dirt.png',
  burst: 'assets/decorations/burst.png',
  story2: 'assets/story/chapter-1/story_part_2.png',
};

function imageData(rel) {
  const file = path.join(root, rel);
  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
}

const img = Object.fromEntries(Object.entries(assets).map(([key, rel]) => [key, imageData(rel)]));

function esc(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function textLines(lines, x, y, options = {}) {
  const {
    size = 42,
    line = 58,
    weight = 500,
    fill = C.black,
    family = FONT.bodyFamily,
    anchor = 'start',
    italic = false,
    letter = 0,
  } = options;
  return lines.map((lineText, index) => `<text x="${x}" y="${y + (index * line)}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${italic ? 'italic' : 'normal'}" letter-spacing="${letter}" fill="${fill}">${esc(lineText)}</text>`).join('');
}

function baseDefs(extra = '') {
  return `<defs>
    <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="13" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g"><feFuncA type="table" tableValues="0 0.055"/></feComponentTransfer></filter>
    <linearGradient id="creamGrad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.cream2}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.red2}"/><stop offset="1" stop-color="#970a12"/></linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="20" stdDeviation="22" flood-opacity="0.35"/></filter>
    ${extra}
  </defs>`;
}

function texture() {
  return `<rect width="${W}" height="${H}" fill="#6a5740" filter="url(#paper)" opacity="0.26" pointer-events="none"/>`;
}

function topBand(label, icon = '★') {
  const iconMarkup = icon === '⚾'
    ? `<g transform="translate(682 90)"><circle r="38" fill="white"/><path d="M-16-30C-2-18 2-7 4 5M16 30C2 18-2 7-4-5" fill="none" stroke="${C.red}" stroke-width="5"/><path d="M-20-20l10 3m-4 8l10 3M20 20l-10-3m4-8l-10-3" stroke="${C.red}" stroke-width="4"/></g>`
    : icon === '✎'
      ? `<g transform="translate(646 48) rotate(-38 34 34)"><rect x="5" y="25" width="70" height="20" rx="4" fill="white"/><path d="M75 25l22 10-22 10z" fill="white"/><path d="M5 25l-14 10L5 45z" fill="${C.gold}"/></g>`
      : `<path d="M682 44l14 29 32 5-23 22 5 32-28-15-29 15 6-32-23-22 32-5z" fill="white"/>`;
  return `<path d="M0 0H3300V180H0Z" fill="${C.black}"/>
    <path d="M0 0H520L600 90L520 180H0Z" fill="url(#redGrad)"/>
    <text x="70" y="122" font-family="${FONT.displayFamily}" font-size="86" font-weight="800" fill="white" letter-spacing="2">CHAPTER 1</text>
    ${iconMarkup}
    <text x="760" y="122" font-family="${FONT.displayFamily}" font-size="78" font-weight="700" fill="white" letter-spacing="2">${esc(label)}</text>
    <path d="M2570 145C2810 65 3040 90 3300 18" fill="none" stroke="${C.red}" stroke-width="30" opacity="0.75"/>`;
}

function footer(message, sub = 'COURAGE COMES BEFORE CONFIDENCE') {
  return `<path d="M0 2260C580 2185 1120 2215 1690 2240C2230 2264 2730 2198 3300 2135V2550H0Z" fill="${C.black}"/>
    <path d="M2460 2550L3300 2550L3300 2180C3050 2240 2810 2260 2570 2260Z" fill="${C.red}" opacity="0.96"/>
    <circle cx="145" cy="2380" r="72" fill="none" stroke="${C.red2}" stroke-width="17"/><path d="M145 2318l18 38 42 6-31 29 8 42-37-20-38 20 8-42-31-29 43-6z" fill="${C.red2}"/>
    <text x="260" y="2372" font-family="${FONT.displayFamily}" font-size="74" font-weight="800" fill="white" letter-spacing="1">${esc(message)}</text>
    <text x="260" y="2452" font-family="${FONT.bodyFamily}" font-size="40" font-weight="700" fill="${C.gold}" letter-spacing="2">${esc(sub)}</text>`;
}

function card(x, y, w, h, title, lines, options = {}) {
  const {
    accent = C.red,
    bodySize = 36,
    line = 48,
    fill = C.cream2,
    titleInset = 36,
    bodyInset = 38,
  } = options;
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${fill}" stroke="#241d19" stroke-width="6"/>
    <path d="M${x} ${y}H${x + w}V${y + 88}H${x}Z" fill="${accent}"/>
    <text x="${x + titleInset}" y="${y + 66}" font-family="${FONT.displayFamily}" font-size="58" font-weight="800" fill="white" letter-spacing="1">${esc(title)}</text>
    ${textLines(lines, x + bodyInset, y + 145, { size: bodySize, line, weight: 500 })}</g>`;
}

function svg(content, extraDefs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3300" height="2550" viewBox="0 0 3300 2550">
  ${baseDefs(extraDefs)}
  ${content}
  </svg>`;
}

const pages = [];

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  <image href="${img.crest}" x="90" y="70" width="330" height="345" preserveAspectRatio="xMidYMid meet"/>
  <text x="470" y="210" font-family="${FONT.displayFamily}" font-size="104" font-weight="900" fill="${C.black}" letter-spacing="3">CHAPTER 1</text>
  <text x="115" y="760" font-family="${FONT.displayFamily}" font-size="188" font-weight="900" fill="${C.black}" letter-spacing="2">BE A</text>
  <text x="115" y="970" font-family="${FONT.displayFamily}" font-size="244" font-weight="900" fill="${C.red}" letter-spacing="1">BRAVE</text>
  <text x="115" y="1190" font-family="${FONT.displayFamily}" font-size="218" font-weight="900" fill="${C.black}" letter-spacing="1">HITTER</text>
  <path d="M115 1260H1260" stroke="${C.red}" stroke-width="20"/>
  ${textLines(['Courage comes before confidence.', 'You do not have to feel fearless.', 'Be ready. Be brave. Take your best swing.'], 125, 1370, {size: 74, line: 104, weight: 650})}
  <g transform="translate(2010 270)" filter="url(#shadow)"><image href="${img.gio}" x="0" y="0" width="1160" height="1740" preserveAspectRatio="xMidYMid meet"/></g>
  <path d="M90 1790H1420V2190H90Z" fill="${C.black}" opacity="0.95"/>
  <text x="125" y="1895" font-family="${FONT.displayFamily}" font-size="84" font-weight="800" fill="${C.gold}">CORE RULE</text>
  ${textLines(['My job is not to get a hit.', 'My job is to be ready, be brave,', 'and take my best swing.'], 125, 1990, {size: 78, line: 86, weight: 650, fill: C.white, italic: true})}
  <path d="M0 2440H3300V2550H0Z" fill="${C.red}"/>
  <text x="1650" y="2520" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="72" font-weight="900" fill="white" letter-spacing="5">COURAGE • CHOICE • COMPETITION</text>
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('THE STORY — PART 1', '◆')}
  <image href="${img.redbrush}" x="75" y="225" width="1030" height="245" preserveAspectRatio="none"/>
  <text x="120" y="425" font-family="${FONT.displayFamily}" font-size="146" font-weight="900" fill="${C.black}">GIO STEPS UP</text>
  ${textLines([
    'Gio loves baseball. At practice, swinging feels easy.',
    'Games feel different. In the batter’s box, everything',
    'suddenly feels more important.',
    '',
    '“What if I strike out? What if I miss?”',
    '',
    'The first pitch comes. Gio watches it. Strike one.',
    'He was not fooled. He simply could not decide to swing.',
    '',
    'Coach Mark notices. Before Gio’s next at-bat, he says,',
    '“You don’t have to know what will happen.',
    'Just be ready for this pitch.”',
    '',
    'Nervousness does not mean Gio is not ready.',
    'Bravery is choosing to compete while the nerves are there.'
  ], 125, 560, {size: 56, line: 78, weight: 520})}
  <image href="${img.gioReady}" x="2210" y="420" width="820" height="1230" preserveAspectRatio="xMidYMid meet"/>
  <path d="M2080 1710H3180" stroke="${C.red}" stroke-width="16"/>
  ${textLines(['READY FOR', 'THIS PITCH.'], 2630, 1810, {size: 82, line: 92, weight: 900, fill: C.black, family: FONT.displayFamily, anchor: 'middle'})}
  <g transform="translate(105 1860)"><rect width="1370" height="250" rx="30" fill="${C.black}"/><circle cx="105" cy="125" r="66" fill="${C.gold}"/><text x="105" y="148" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="70" fill="${C.black}">!</text>${textLines(['BRAVE DOES NOT MEAN FEARLESS.', 'BRAVE MEANS READY TO COMPETE.'], 205, 96, {size: 50, line: 72, weight: 800, fill: C.white})}</g>
  ${footer('BE READY FOR THIS PITCH.')}
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('THE STORY — PART 2', '◆')}
  <clipPath id="story2clip"><path d="M1580 180H3300V2260H1460C1580 1940 1610 1580 1560 1210C1510 820 1515 490 1580 180Z"/></clipPath>
  <image href="${img.story2}" x="1400" y="180" width="2000" height="2080" preserveAspectRatio="xMinYMid slice" clip-path="url(#story2clip)"/>
  <path d="M0 180H1690C1560 540 1560 960 1625 1360C1680 1700 1600 2020 1450 2260H0Z" fill="url(#creamGrad)"/>
  <image href="${img.redbrush}" x="75" y="225" width="1270" height="245" preserveAspectRatio="none"/>
  <text x="120" y="425" font-family="${FONT.displayFamily}" font-size="132" font-weight="900" fill="${C.black}">A BRAVE AT-BAT</text>
  ${textLines([
    'At his next at-bat, Gio makes a promise:',
    '“If it’s my pitch, I’m swinging.”',
    '',
    'The pitch comes. Gio swings—and misses.',
    'Instead of growing, the nervous feeling gets smaller.',
    'He did the thing he was afraid to do.',
    '',
    'Another pitch comes. Gio sees it and swings. CRACK!',
    'He hits a hard ground ball. The infielder makes the play.',
    'Gio is out.',
    '',
    'Coach Mark meets him: “That was a Brave At-Bat.”',
    'A hit is never guaranteed. Competing is a choice.',
    'Judge courage by whether you were willing to take your swing.'
  ], 125, 560, {size: 56, line: 78, weight: 520})}
  <g transform="translate(105 1870)"><rect width="1320" height="230" rx="30" fill="${C.red}"/><text x="660" y="92" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="66" font-weight="900" fill="white">“THAT WAS A BRAVE AT-BAT.”</text><text x="660" y="168" text-anchor="middle" font-family="${FONT.bodyFamily}" font-size="42" font-weight="650" fill="white">Quality competition matters—even when the result is an out.</text></g>
  ${footer('TAKE YOUR SWING.', 'CONTROL THE DECISION, NOT THE RESULT')}
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('WHAT GIO LEARNED', '★')}
  <text x="110" y="350" font-family="${FONT.displayFamily}" font-size="138" font-weight="900" fill="${C.black}">COURAGE FIRST</text>
  <path d="M110 390H1520" stroke="${C.red}" stroke-width="18"/>
  ${card(100, 480, 940, 420, '1  COURAGE FIRST', ['You do not need to feel confident', 'before you act. Brave action can', 'be what creates confidence.'], {bodySize: 58, line: 76, titleInset: 26, bodyInset: 26})}
  ${card(1100, 480, 940, 420, '2  SWINGS ARE CHOICES', ['A hit depends on many things.', 'Choosing to swing at your pitch', 'is something you can control.'], {bodySize: 58, line: 76, titleInset: 26, bodyInset: 26})}
  ${card(2100, 480, 1100, 420, '3  RESULTS AREN’T EVERYTHING', ['A great swing can become an out.', 'Judge the quality of competition—', 'not only the result.'], {bodySize: 60, line: 78, titleInset: 26, bodyInset: 26})}
  <g><rect x="100" y="970" width="1700" height="510" rx="40" fill="${C.black}"/><text x="130" y="1060" font-family="${FONT.displayFamily}" font-size="82" font-weight="900" fill="${C.gold}">WHY IT MATTERS</text>${textLines(['If success only means getting a hit, baseball becomes', 'stressful. Preparation, courage, good decisions, and', 'committed swings give Gio more ways to succeed—and', 'more confidence to build on.'], 130, 1150, {size: 58, line: 76, weight: 520, fill: C.white})}</g>
  <g><rect x="100" y="1530" width="1900" height="555" rx="40" fill="${C.cream2}" stroke="${C.red}" stroke-width="10"/><text x="130" y="1625" font-family="${FONT.displayFamily}" font-size="82" font-weight="900" fill="${C.red}">REAL BASEBALL EXAMPLE</text>${textLines(['Excellent hitters make outs all the time. A hard line', 'drive caught by a defender can be a better at-bat', 'than a weak ball that becomes a single. Good hitters', 'separate the quality of their process from the luck', 'of the result.'], 130, 1720, {size: 58, line: 70, weight: 520})}</g>
  <image href="${img.coach}" x="2160" y="980" width="1000" height="1110" preserveAspectRatio="xMidYMid meet"/>
  <path d="M2200 1780C2380 1670 2710 1660 3030 1760L2980 2070C2700 1980 2430 1990 2230 2070Z" fill="${C.red}" opacity="0.96"/>
  <text x="2600" y="1788" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="50" font-weight="900" fill="${C.gold}" letter-spacing="2">COACH MARK SAYS</text>
  ${textLines(['Don’t judge courage', 'by the result.'], 2600, 1868, {size: 60, line: 78, weight: 800, fill: C.white, anchor: 'middle', italic: true})}
  ${footer('BRAVE HITTERS CHOOSE TO COMPETE.')}
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('PARENT DUGOUT', '⚾')}
  <text x="110" y="360" font-family="${FONT.displayFamily}" font-size="136" font-weight="900" fill="${C.red}">REINFORCE COURAGE</text>
  <text x="112" y="430" font-family="${FONT.bodyFamily}" font-size="50" font-weight="650" fill="${C.black}">Help your player value brave competition—not statistics.</text>
  <g><rect x="100" y="520" width="1030" height="1110" rx="42" fill="${C.black}"/><text x="135" y="625" font-family="${FONT.displayFamily}" font-size="90" font-weight="900" fill="${C.gold}">PRAISE</text>${textLines(['✓ Committed swings', '✓ Good decisions', '✓ Recovering after a miss', '✓ Competing while nervous', '✓ Attacking a hittable pitch'], 135, 755, {size: 68, line: 174, weight: 650, fill: C.white})}</g>
  <g><rect x="1190" y="520" width="1010" height="1110" rx="42" fill="${C.cream2}" stroke="${C.red}" stroke-width="10"/><text x="1225" y="625" font-family="${FONT.displayFamily}" font-size="90" font-weight="900" fill="${C.red}">ASK</text>${textLines(['“What felt brave today?”', '', '“Was there a swing you were', 'proud of?”', '', '“What did you control well?”'], 1225, 755, {size: 68, line: 140, weight: 620})}</g>
  <g><rect x="2250" y="520" width="900" height="1110" rx="42" fill="${C.red}"/><text x="2285" y="635" font-family="${FONT.displayFamily}" font-size="94" font-weight="900" fill="white">AVOID</text>${textLines(['Turning every ride home', 'into an evaluation of hits,', 'strikeouts, or batting', 'average.', '', 'Your relationship is', 'always bigger than the', 'box score.'], 2285, 775, {size: 66, line: 112, weight: 600, fill: C.white})}</g>
  <path d="M100 1730H2190V2100H100Z" fill="${C.white}" stroke="${C.black}" stroke-width="7"/><text x="130" y="1825" font-family="${FONT.displayFamily}" font-size="80" font-weight="900" fill="${C.black}">PARENT REMINDER</text>${textLines(['Praise the choice to compete. Listen first. Keep the game', 'connected to courage, learning, effort, and joy.'], 130, 1930, {size: 60, line: 82, weight: 600})}
  ${footer('THE RELATIONSHIP IS BIGGER THAN THE BOX SCORE.')}
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('REFLECTION TIME', '✎')}
  <text x="110" y="355" font-family="${FONT.displayFamily}" font-size="140" font-weight="900" fill="${C.red}">THINK. WRITE. GROW.</text>
  <text x="115" y="425" font-family="${FONT.bodyFamily}" font-size="48" font-weight="600">Take a few minutes to notice the brave choices you made.</text>
  <image href="${img.gioReflect}" x="2360" y="400" width="770" height="1150" preserveAspectRatio="xMidYMid meet" opacity="0.98"/>
  <g fill="none" stroke="${C.black}" stroke-width="5">
    <path d="M150 670H2220M150 770H2220"/><path d="M150 1000H2220M150 1100H2220"/><path d="M150 1330H2220M150 1430H2220"/><path d="M150 1660H2220M150 1760H2220"/><path d="M150 1990H2220M150 2090H2220"/>
  </g>
  ${textLines(['1. When did you take a Brave Swing?'], 150, 580, {size: 64, weight: 750})}
  ${textLines(['2. What did you do well?'], 150, 910, {size: 64, weight: 750})}
  ${textLines(['3. What will you keep working on?'], 150, 1240, {size: 64, weight: 750})}
  ${textLines(['4. When did you feel nervous but compete anyway?'], 150, 1570, {size: 62, weight: 750})}
  ${textLines(['5. What did you control when you could not control the result?'], 150, 1900, {size: 58, weight: 750})}
  <g><rect x="2390" y="1580" width="750" height="520" rx="40" fill="${C.black}"/><text x="2765" y="1680" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="74" font-weight="900" fill="${C.gold}">REMEMBER</text>${textLines(['There is no perfect', 'answer. Honest reflection', 'helps brave hitters grow.'], 2765, 1795, {size: 54, line: 82, weight: 650, fill: C.white, anchor: 'middle'})}</g>
  ${footer('BRAVE HITTERS REFLECT SO THEY CAN GROW.')}
  ${texture()}
`));

pages.push(svg(`
  <rect width="3300" height="2550" fill="url(#creamGrad)"/>
  ${topBand('KEY TAKEAWAYS', '★')}
  <text x="110" y="370" font-family="${FONT.displayFamily}" font-size="150" font-weight="900" fill="${C.red}">REMEMBER THIS</text>
  <image href="${img.burst}" x="1750" y="260" width="1500" height="1250" preserveAspectRatio="xMidYMid meet" opacity="0.18"/>
  <image href="${img.gioCelebrate}" x="2170" y="350" width="930" height="1395" preserveAspectRatio="xMidYMid meet"/>
  <g font-family="${FONT.displayFamily}" font-weight="900">
    <circle cx="180" cy="620" r="68" fill="${C.red}"/><text x="180" y="648" text-anchor="middle" font-size="64" fill="white">1</text><text x="310" y="650" font-size="98" fill="${C.black}">BE BRAVE.</text>
    <circle cx="180" cy="900" r="68" fill="${C.red}"/><text x="180" y="928" text-anchor="middle" font-size="64" fill="white">2</text><text x="310" y="930" font-size="98" fill="${C.black}">TAKE YOUR BEST SWING.</text>
    <circle cx="180" cy="1180" r="68" fill="${C.red}"/><text x="180" y="1208" text-anchor="middle" font-size="64" fill="white">3</text><text x="310" y="1210" font-size="86" fill="${C.black}">CONTROL THE DECISION, NOT THE RESULT.</text>
    <circle cx="180" cy="1460" r="68" fill="${C.red}"/><text x="180" y="1488" text-anchor="middle" font-size="64" fill="white">4</text><text x="310" y="1490" font-size="86" fill="${C.black}">COURAGE COMES BEFORE CONFIDENCE.</text>
    <circle cx="180" cy="1740" r="68" fill="${C.red}"/><text x="180" y="1768" text-anchor="middle" font-size="64" fill="white">5</text><text x="310" y="1770" font-size="98" fill="${C.black}">HAVE FUN COMPETING.</text>
  </g>
  <g><rect x="170" y="1970" width="2900" height="260" rx="42" fill="${C.black}"/><text x="1620" y="2070" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="80" font-weight="900" fill="${C.gold}">YOUR JOB IS TO BE READY, BE BRAVE,</text><text x="1620" y="2165" text-anchor="middle" font-family="${FONT.displayFamily}" font-size="80" font-weight="900" fill="white">AND TAKE YOUR BEST SWING.</text></g>
  ${footer('THIS IS WHERE CONFIDENCE BEGINS.')}
  ${texture()}
`));

if (pages.length !== CHAPTER_FAMILIES.length || chapter1.pageFamilies.length !== CHAPTER_FAMILIES.length) {
  throw new Error(`Chapter family count mismatch: rendered=${pages.length}, configured=${CHAPTER_FAMILIES.length}`);
}

for (let index = 0; index < pages.length; index += 1) {
  const file = path.join(outDir, `chapter_1_page_${index + 1}.svg`);
  const metadata = `<!-- family:${CHAPTER_FAMILIES[index]} source:${chapter1.source} -->\n`;
  fs.writeFileSync(file, metadata + pages[index]);
}

fs.writeFileSync(path.join(outDir, 'build-manifest.json'), `${JSON.stringify({
  chapter: chapter1.chapter,
  title: chapter1.title,
  source: chapter1.source,
  pagePx: [PAGE.widthPx, PAGE.heightPx],
  pagePt: [PAGE.widthPt, PAGE.heightPt],
  families: CHAPTER_FAMILIES,
  assets,
  fonts: FONT,
}, null, 2)}\n`);

console.log(`Wrote ${pages.length} production SVG pages to ${outDir}`);
