export type Activity={id:string;required:boolean;done:boolean};
export function chapterComplete(items:Activity[]){const required=items.filter(x=>x.required);return required.length>0&&required.every(x=>x.done)}
export function challengeComplete(progress:number,target:number){return target>0&&progress>=target}
export function practiceRecord(activityId:string,reflection:string){return{activityId,reflection,context:'practice' as const,journeyProgressDelta:0,badgeAwarded:false,createdAt:new Date().toISOString()}}
