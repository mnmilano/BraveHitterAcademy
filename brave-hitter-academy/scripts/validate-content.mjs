import data from '../content/curriculum.json' with {type:'json'};

const expected=['FRONT_MATTER.md','APPROVED_STORYLINE.md','CONFIDENCE_TOOLKIT.md','WEEKLY_MISSIONS.md','GAME_DAY_JOURNAL.md','CLOSING_GRADUATION.md'];
const missing=expected.filter(source=>!data.generatedFrom.includes(source));
if(missing.length)throw new Error(`Missing sources: ${missing.join(', ')}`);
if(data.chapters.length!==12)throw new Error('Expected 12 chapters');
for(const chapter of data.chapters){
  for(const key of ['story1','story2','learned','parent','reflection','takeaways']){
    if(!chapter[key].length)throw new Error(`${chapter.id} missing ${key}`);
  }
}
console.log('PASS: complete canonical source inventory and 12 chapter flows');
