import bcrypt from 'bcryptjs';
export const hashPin=(pin:string)=>bcrypt.hash(pin,12);
export const verifyPin=(pin:string,hash:string)=>bcrypt.compare(pin,hash);
export const canEditPlayerReflection=(createdAt:string,now=new Date())=>now.getTime()-new Date(createdAt).getTime()<=24*60*60*1000;
export const canEditParentEntry=(createdAt:string,now=new Date())=>now.getTime()-new Date(createdAt).getTime()<=7*24*60*60*1000;
export function publicAdminProjection(f:{id:string;email:string;players:number;status:string;privateText?:string}){return{id:f.id,email:f.email,players:f.players,status:f.status}}
