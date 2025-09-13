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
import { ArrowBigRight } from 'lucide-react'
function AddNewSessionDialog() {
    const [note,setNote] = useState<string>();
  return (
   <Dialog>
  <DialogTrigger>
      <Button className='mt-3 '>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add basic Details</DialogTitle>
      <DialogDescription asChild>
    <div>
        <h2>Add symptoms or Any Other Details</h2>
        <Textarea placeholder='ADD detail here..' className='h-[250px] mt-1'
            onChange ={(e)=>setNote(e.target.value)} />     
    </div> 
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
 <Button variant ={'outline'}>Cancel</Button>
        </DialogClose>
       
        <Button disabled={!note}>Next <ArrowBigRight/></Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}
export default AddNewSessionDialog
