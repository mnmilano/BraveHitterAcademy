import {NextResponse} from 'next/server';
import {hashPin} from '@/lib/security';
import {authenticatedUser,createSupabaseAdmin} from '@/lib/supabase/admin';

export async function GET(request:Request){
  const user=await authenticatedUser(request);if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
  const admin=createSupabaseAdmin();
  const {data:family}=await admin.from('families').select('id').eq('owner_id',user.id).maybeSingle();
  if(!family)return NextResponse.json({onboarded:false,email:user.email});
  const {data}=await admin.from('family_app_state').select('state').eq('family_id',family.id).maybeSingle();
  return NextResponse.json({onboarded:true,email:user.email,state:data?.state??null});
}

export async function POST(request:Request){
  const user=await authenticatedUser(request);if(!user||!user.email_confirmed_at)return NextResponse.json({error:'Verified parent email required'},{status:403});
  const body=await request.json();const name=String(body.name??'').trim(),pin=String(body.pin??''),age=body.age?Number(body.age):undefined;
  if(!name||!/^[0-9]{4,8}$/.test(pin)||age&&(age<4||age>17))return NextResponse.json({error:'Invalid onboarding details'},{status:400});
  const admin=createSupabaseAdmin();
  const {data:existing}=await admin.from('families').select('id').eq('owner_id',user.id).maybeSingle();
  if(existing)return NextResponse.json({error:'Family already exists'},{status:409});
  const {data:family,error}=await admin.from('families').insert({owner_id:user.id}).select('id').single();if(error)return NextResponse.json({error:'Could not create family'},{status:500});
  const player={id:crypto.randomUUID(),name,age,completed:[],reflections:[],games:[]};
  const state={players:[player],activePlayerId:player.id};
  const pinHash=await hashPin(pin);
  const writes=await Promise.all([
    admin.from('consents').insert({family_id:family.id,adult_confirmed:true,terms_version:'draft-v1',privacy_version:'draft-v1'}),
    admin.from('parent_security').insert({family_id:family.id,pin_hash:pinHash}),
    admin.from('players').insert({id:player.id,family_id:family.id,first_name:name,age}),
    admin.from('family_app_state').insert({family_id:family.id,state}),
  ]);
  if(writes.some(x=>x.error))return NextResponse.json({error:'Family setup did not finish'},{status:500});
  return NextResponse.json({state});
}

export async function PUT(request:Request){
  const user=await authenticatedUser(request);if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await request.json();const admin=createSupabaseAdmin();
  const {data:family}=await admin.from('families').select('id').eq('owner_id',user.id).maybeSingle();if(!family)return NextResponse.json({error:'No family'},{status:404});
  const state={players:Array.isArray(body.players)?body.players:[],activePlayerId:String(body.activePlayerId??'')};
  const {error}=await admin.from('family_app_state').upsert({family_id:family.id,state});
  return error?NextResponse.json({error:'Save failed'},{status:500}):NextResponse.json({saved:true});
}
