import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();const read=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r/g,'');
const clean=s=>s.trim().replace(/\n{3,}/g,'\n\n');
const storyline=read('APPROVED_STORYLINE.md');
const chapterHeaders=[...storyline.matchAll(/^={60}\nCHAPTER (\d+)\n([^\n]+)\n={60}\n/gm)];
const progressionStart=storyline.search(/^={60}\nACADEMY PROGRESSION\n/m);
const blocks=chapterHeaders.map((header,index)=>{
  const bodyStart=(header.index??0)+header[0].length;
  const bodyEnd=chapterHeaders[index+1]?.index??(progressionStart>=0?progressionStart:storyline.length);
  return [header[0],header[1],header[2],storyline.slice(bodyStart,bodyEnd)];
});
const section=(body,name)=>{const marker=`## ${name}\n`;const start=body.indexOf(marker);if(start<0)return '';const from=start+marker.length;const end=body.indexOf('\n## ',from);return clean(body.slice(from,end<0?body.length:end));};
const paragraphs=s=>clean(s).split(/\n\n+/).map(clean).filter(Boolean);
const bullets=s=>clean(s).split(/\n(?=- )/).map(x=>x.replace(/^- /,'').replace(/\n(?!- )/g,' ').trim()).filter(Boolean);
const chapters=blocks.map(m=>{const order=+m[1],body=m[3];const reflection=bullets(section(body,'REFLECTION TIME'));const takeaways=paragraphs(section(body,'KEY TAKEAWAYS')).map(x=>x.replace(/\n/g,' '));const learned=section(body,'WHAT GIO LEARNED');return {id:`chapter-${order}`,order,title:m[2].trim(),coreLesson:(body.match(/CORE LESSON:\n\n([\s\S]*?)\n\n(?:CORE RULE|CORE IDEA):/)||[])[1]?.trim()||'',coreIdea:(body.match(/(?:CORE RULE|CORE IDEA):\n\n([\s\S]*?)\n\n## STORY/)||[])[1]?.trim()||'',story1:paragraphs(section(body,'STORY — PART 1')),story2:paragraphs(section(body,'STORY — PART 2')),learned:paragraphs(learned),parent:paragraphs(section(body,'PARENT DUGOUT')),reflection,takeaways,badge:['Brave Hitter','Swing Warrior','Pitch Tracker','Bounce Back','Hard Contact Hero','Positive Coach','Team Leader','Fearless Swinger','Big Moment Player','Recovery Master','Confidence Builder','Brave Hitter Graduate'][order-1],source:'APPROVED_STORYLINE.md'};});
if(chapters.length!==12)throw new Error(`Expected 12 chapters, found ${chapters.length}`);if(chapters.some(c=>!c.story1.length||!c.story2.length||!c.reflection.length||!c.takeaways.length))throw new Error('Incomplete chapter extraction');
const supporting=['FRONT_MATTER.md','CONFIDENCE_TOOLKIT.md','WEEKLY_MISSIONS.md','GAME_DAY_JOURNAL.md','CLOSING_GRADUATION.md'].map(file=>({file,markdown:read(file)}));
fs.mkdirSync(path.join(root,'content'),{recursive:true});fs.writeFileSync(path.join(root,'content/curriculum.json'),JSON.stringify({schemaVersion:1,generatedFrom:['APPROVED_STORYLINE.md',...supporting.map(x=>x.file)],chapters,supporting},null,2)+'\n');console.log(`Migrated ${chapters.length} chapters and ${supporting.length} supporting sources`);
