"use client" 
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { log } from 'console';
 
type sessionDetail={
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor: doctorAgent,
  createdOn:string,
}
function MedicalVoiceAgent() {
  const {sessionId} = useParams();
  const [sessionDetail,setSessionDetail] = useState<sessionDetail>();
  const[callStarted,setCallStarted] = useState(false);
  const [vapiInstance,setVapiInstance] = useState<any>();
  

  useEffect(()=>{
    sessionId&&GetSessionDetails();
  },[sessionId])

  const GetSessionDetails = async()=>{
 const result = await axios.get('/api/session-chat?sessionId='+sessionId);
   console.log(result.data);
   setSessionDetail(result.data);
   
  }
   const StartCall=()=>{
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY! );
    setVapiInstance(vapi);
      vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    vapi.on('call-start', () => {console.log('Call started');
       setCallStarted(true);

    });
vapi.on('call-end', () => {
  setCallStarted(false);
  console.log('Call ended')});
vapi.on('message', (message) => {
  if (message.type === 'transcript') {
    console.log(`${message.role}: ${message.transcript}`);
  }
});
   }
 const endCall = () => {
  if(!vapiInstance) return;
  // stop the call
      vapiInstance.stop();
      //optionally remove listeners(good memory management)
      vapiInstance.off('call-start');
      vapiInstance.off('call-end');
      vapiInstance.off('message');
    // reset call state

    setCallStarted(false);
    setVapiInstance(null);
  };


  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 rounded-full ${callStarted?'bg-green-500':'bg-red-500'}`}/>{callStarted?'Connected':'Not connected'}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00.00      </h2>
      </div>
   
     {sessionDetail && <div className='flex items-center  flex-col mt-10 '>  <Image src ={sessionDetail?.selectedDoctor?.image}  alt={ sessionDetail?.selectedDoctor?.specialist??''}  width={80} height={80}
     className='h-[100px] w-[100px] object-cover rounded-full '/> 
     <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}  </h2>
     <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>
        <div className='mt-32'>
          <h2 className='text-gray-400 '>Assistant Msg</h2>
          <h2 className='text-lg'>User Msg</h2>
          </div>
  { !callStarted? <Button className='mt-20' onClick={StartCall}><PhoneCall/> Start Call</Button>
  :<Button variant={'destructive'} onClick={endCall}> <PhoneOff />Disconnect</Button>
}
     </div>  }
    </div> 
  )

}
export default MedicalVoiceAgent