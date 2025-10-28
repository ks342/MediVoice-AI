import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI agent Info and conversation between AI medical agent and user , generate a structured report with the following fields:

sessionId: a unique session identifier
agent: the medical specialist name (e.g., "General Physician AI")
user: name of the patient or "Anonymous" if not provided
timestamp: current date and time in ISO format
chiefComplaint: one-sentence summary of the main health concern
summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
symptoms: list of symptoms mentioned by the user
duration: how long the user has experienced the symptoms
severity: mild, moderate, or severe
medicationsMentioned: list of any medicines mentioned
recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
  only include valid fields. Respond with nothing else`
export async function POST(req:NextRequest){
    const{sessionId,sessionDetail,messages} = await req.json();
    try{
        console.log('Generating medical report for session:', sessionId);
        console.log('Messages count:', messages?.length || 0);
        console.log('Session detail:', sessionDetail);

        if (!sessionId || !messages || messages.length === 0) {
            return NextResponse.json({ error: 'Session ID and messages are required' }, { status: 400 });
        }

        if(!process.env.OPEN_ROUTER_API_KEY){
          return NextResponse.json({ error: 'OPEN_ROUTER_API_KEY is not set' }, { status: 500 });
        }
        const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

        const UserInput = "AI Doctor Agent Info:"+JSON.stringify(sessionDetail)+",Conversation:"+JSON.stringify(messages);

        const completion = await openai.chat.completions.create({
            model,
            messages: [
                {role:'system',content: REPORT_GEN_PROMPT},
              { role: "user", content: UserInput }
            ],
          });
          
          const rawResp = completion.choices[0].message||'';
          // @ts-expect-error content can be string
          const Resp = rawResp.content.trim().replace('```json','').replace('```','');
          
          let JSONResp: Record<string, unknown>;
          try {
            JSONResp = JSON.parse(Resp);
          } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
            console.error('Raw response:', Resp);
            return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
          }

          await db.update(SessionChatTable).set({
            report:JSONResp
          }).where(eq(SessionChatTable.sessionId,sessionId))
          
          console.log('Report saved to database');
          return NextResponse.json(JSONResp);
    }catch(e){
        const message = (e as Error)?.message || 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}            