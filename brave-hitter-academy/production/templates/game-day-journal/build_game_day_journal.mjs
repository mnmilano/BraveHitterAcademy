import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE, FONT } from '../system/production-config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const prototypeDir = path.join(root, 'production/pages/game-day-journal/prototype/source');
const out = path.join(root, 'production/pages/game-day-journal/source');
fs.mkdirSync(out, { recursive: true });
const beforeTemplate = fs.readFileSync(path.join(prototypeDir, 'game_day_journal_game_01_before.svg'), 'utf8');
const afterTemplate = fs.readFileSync(path.join(prototypeDir, 'game_day_journal_game_01_after.svg'), 'utf8');
const pages = [];
for (let game = 1; game <= 20; game += 1) {
  const id = String(game).padStart(2, '0');
  for (const [side, template] of [['before', beforeTemplate], ['after', afterTemplate]]) {
    const heading = side === 'before' ? 'BEFORE' : 'AFTER';
    const svg = template.replace(`prototype:game-1-${side}`, `game:${game}-${side}`).replace(`GAME 1 • ${heading} THE GAME`, `GAME ${game} • ${heading} THE GAME`);
    const file = `game_day_journal_game_${id}_${side}.svg`;
    fs.writeFileSync(path.join(out, file), svg);
    pages.push({ game, side, file });
  }
}
fs.writeFileSync(path.join(out, 'build-manifest.json'), JSON.stringify({ section: 'Game Day Journal', source: 'GAME_DAY_JOURNAL.md', pageCount: pages.length, games: 20, pagesPerGame: 2, pagePx: [PAGE.widthPx, PAGE.heightPx], pagePt: [PAGE.widthPt, PAGE.heightPt], fonts: FONT, approvedPrototype: 'production/pages/game-day-journal/prototype/source', pages }, null, 2) + '\n');
console.log(`Wrote ${pages.length} Game Day Journal SVGs to ${out}`);
