"use client"
 
 import { Button } from '@/components/ui/button'
 import { IconArrowRight } from '@tabler/icons-react'
 import Image from 'next/image'
 import React from 'react'
 import axios from 'axios'
 import { useRouter } from 'next/navigation'
 
 export type doctorAgent={
     id:number,
     specialist:string,
     description:string,
     image:string,
     agentPrompt:string
 }
  type props ={
    doctorAgent:doctorAgent
  }
 function DoctorAgentCard({doctorAgent}:props) {
   const router = useRouter();

   const onStart = async()=>{
     try{
       const result = await axios.post('/api/session-chat',{
         notes:"Quick start",
         selectedDoctor:doctorAgent
       });
       if(result.data?.sessionId){
         router.push(`/dashboard/medical-agent/${result.data.sessionId}`)
       }
     }catch(e){
       console.error(e);
       alert('Unable to start consultation. Please try again.');
     }
   }
   return (
     <div>
        <Image src ={doctorAgent.image}
        alt ={doctorAgent.specialist} width={200} 
         height={300}
            className='w-full h-[250px] object-cover rounded-xl'></Image> 
            <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>  
            <p className='line-clamp-2   text-sm text-gray-500'> {doctorAgent.description}</p>
            <Button className='w-full mt-2 ' onClick={onStart}>Start Consultation<IconArrowRight /></Button>
          </div>
   )
 }
 
 export default DoctorAgentCard