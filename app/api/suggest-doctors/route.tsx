import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const{notes } = await req.json();
    try{
  // Guard: API key must exist
  if(!process.env.OPEN_ROUTER_API_KEY){
    return NextResponse.json({error:'OPEN_ROUTER_API_KEY is not set'}, { status: 500 });
  }
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
  const completion = await openai.chat.completions.create({
    model,
    messages: [
        {role:'system',content:JSON.stringify(AIDoctorAgents)},
      { role: "user", content: "User Notes/Symptoms:"+notes+", Based on the user notes and symptoms, suggest a list of relevant AI doctors. Return JSON only with a 'doctors' array." }
    ],
  });
  const rawMsg = completion.choices[0].message;
  const content = (typeof rawMsg?.content === 'string' ? rawMsg.content : '') as string;
  const Resp = content.trim().replace('```json','').replace('```','');
  const JSONResp =JSON.parse(Resp);
  return NextResponse.json(JSONResp);
    }catch(e){
       const message = (e as Error)?.message || 'Unknown error';
       return NextResponse.json({ error: message }, { status: 500 });
    }
}