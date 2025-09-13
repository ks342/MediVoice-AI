import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const{notes } = await req.json();
    try{
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-405b-instruct:free",
    messages: [
        {role:'system',content:JSON.stringify(AIDoctorAgents)},
      { role: "user", content: "User Notes/Symptoms:"+notes+",Depends on user notes and symptoms,Please suggest list of doctoes, Return object in json only" }
    ],
  });
  const rawResp = completion.choices[0].message;
  return NextResponse.json(rawResp);
    }catch(e){
       return NextResponse.json(e);
    }
}