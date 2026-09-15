import fs from 'node:fs';
import path from 'node:path';
import {notFound} from 'next/navigation';

const documents={
  terms:{title:'Terms of Service — Draft',file:'TERMS_OF_SERVICE_DRAFT.md'},
  privacy:{title:'Privacy Policy — Draft',file:'PRIVACY_POLICY_DRAFT.md'},
} as const;

export default async function LegalPage({params}:{params:Promise<{document:string}>}){
  const {document}=await params;
  const selected=documents[document as keyof typeof documents];
  if(!selected)notFound();
  const markdown=fs.readFileSync(path.join(process.cwd(),'docs/legal',selected.file),'utf8');
  return <main className="min-h-screen px-4 py-10"><article className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-10"><a href="/" className="font-bold text-red">← Back to the Academy</a><p className="athletic mt-6 inline-block rounded-full bg-gold px-3 py-1 text-sm">Clearly marked legal draft</p><h1 className="athletic mt-3 text-4xl">{selected.title}</h1><div className="legal-copy mt-8 whitespace-pre-wrap leading-7">{markdown}</div></article></main>;
}

export function generateStaticParams(){return Object.keys(documents).map(document=>({document}))}
