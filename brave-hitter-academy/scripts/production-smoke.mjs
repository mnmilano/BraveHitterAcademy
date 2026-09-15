import {createClient} from '@supabase/supabase-js';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const base=process.env.APP_URL;
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey=process.env.SUPABASE_SECRET_KEY;
assert(base&&url&&publicKey&&secretKey,'Required smoke-test environment is missing');
const admin=createClient(url,secretKey,{auth:{persistSession:false}});
const browser=createClient(url,publicKey,{auth:{persistSession:false}});
const suffix=crypto.randomBytes(8).toString('hex');
const email=`bha-smoke-${suffix}@example.com`,password=`Smoke-${crypto.randomBytes(12).toString('base64url')}!`;
let userId;
try{
  const created=await admin.auth.admin.createUser({email,password,email_confirm:true});
  assert.ifError(created.error);userId=created.data.user.id;
  const signedIn=await browser.auth.signInWithPassword({email,password});assert.ifError(signedIn.error);
  const token=signedIn.data.session.access_token,headers={'content-type':'application/json',authorization:`Bearer ${token}`};
  const setup=await fetch(`${base}/api/family`,{method:'POST',headers,body:JSON.stringify({pin:'4826',name:'Smoke Player',age:9})});assert.equal(setup.status,200);
  const pin=await fetch(`${base}/api/parent-pin`,{method:'POST',headers,body:JSON.stringify({pin:'4826'})});assert.equal(pin.status,200);assert.equal((await pin.json()).valid,true);
  const wrongPin=await fetch(`${base}/api/parent-pin`,{method:'POST',headers,body:JSON.stringify({pin:'1111'})});assert.equal((await wrongPin.json()).valid,false);
  const state=await fetch(`${base}/api/family`,{headers});assert.equal(state.status,200);assert.equal((await state.json()).state.players[0].name,'Smoke Player');
  console.log('PASS: production auth, onboarding, cloud state, and Parent PIN');
}finally{
  if(userId)await admin.auth.admin.deleteUser(userId);
}
