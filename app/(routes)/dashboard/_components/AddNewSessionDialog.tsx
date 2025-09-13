"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowBigRight, ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'

function AddNewSessionDialog() {
    const [note,setNote] = useState<string>();
 const[loading,setLoading] =  useState(false);
 const [suggestedDoctors,setSuggestedDoctors] = useState<doctorAgent[]>();
const OnClickNext = async() =>{
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors',{notes:note});
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
}

  return (
   <Dialog>
  <DialogTrigger>
      <Button className='mt-3 '>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add basic Details</DialogTitle>
      <DialogDescription asChild>
    {!suggestedDoctors ? <div>
        <h2>Add symptoms or Any Other Details</h2>
        <Textarea placeholder='ADD detail here..' className='h-[200px] mt-1'
            onChange ={(e)=>setNote(e.target.value)} />     
    </div>:<div className='grid grid-cols-2 gap-5'>
        {/* suggested doctors */}
        {suggestedDoctors.map((doctor,index)=>(
            <SuggestedDoctorCard doctorAgent={doctor} key ={index}/>
        ))}
    </div>}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
 <Button variant ={'outline'}>Cancel</Button>
        </DialogClose>
       
        {!suggestedDoctors ? <Button disabled={!note 
            || loading
        } onClick={()=>OnClickNext()}>

            Next {loading ? <Loader2 className='animate-spin' />:<ArrowRight/>}</Button>
        :<Button>Start Consultation</Button>}
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}
export default AddNewSessionDialog
