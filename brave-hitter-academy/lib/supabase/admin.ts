import {createClient} from '@supabase/supabase-js';

export function createSupabaseAdmin(){
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SECRET_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});
}

export async function authenticatedUser(request:Request){
  const token=request.headers.get('authorization')?.replace(/^Bearer\s+/i,'');
  if(!token)return null;
  const admin=createSupabaseAdmin();
  const {data,error}=await admin.auth.getUser(token);
  return error?null:data.user;
}
