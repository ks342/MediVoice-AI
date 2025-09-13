import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'


type props={
    doctorAgent :doctorAgent
}
function SuggestedDoctorCard({doctorAgent}:props) {
  return (
    <div className='flex flex-col items-center  border rounded-2xl shadow p-' >
        <Image src ={doctorAgent.image}
        alt = {doctorAgent.specialist}
        height={70}
        width ={70} 
        className='w-[50px] h-[50px] rounded-4xl object-cover'/>
        <h2 className='font-bold text-sm text-center'>{doctorAgent.specialist}</h2>
        <p className='text-xs text-center line-clamp-2'>{doctorAgent.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
