import {NextResponse} from 'next/server';
import {verifyPin} from '@/lib/security';
import {authenticatedUser,createSupabaseAdmin} from '@/lib/supabase/admin';

export async function POST(request:Request){
  const user=await authenticatedUser(request);if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
  const {pin}=await request.json();const admin=createSupabaseAdmin();
  const {data:family}=await admin.from('families').select('id').eq('owner_id',user.id).maybeSingle();if(!family)return NextResponse.json({valid:false},{status:404});
  const {data}=await admin.from('parent_security').select('pin_hash').eq('family_id',family.id).maybeSingle();
  return NextResponse.json({valid:Boolean(data&&await verifyPin(String(pin),data.pin_hash))});
}
