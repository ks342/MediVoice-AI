 import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
 

const menuOptions=[
  {
    id:1,
    name:'Home',
    path:'/'
  },
   {
    id:2,
    name:'History',
    path:'/dashboard/history'
  },
   {
    id:4,
    name:'Profile',
    path:'/dashboard/profile'
  } 
]

 function AppHeader() {
   return (
     <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
      <Link href='/'>
        <div className='flex items-center gap-2'>
          <Image src={'/medical-assistance.png'} alt='MediVoice AI' width={28} height={28} />
          <h1 className='text-xl md:text-2xl font-bold'>MediVoice AI</h1>
        </div>
      </Link>
   <div className='hidden md:flex gap-12 items-center'>
     {menuOptions.map((option,index)=>(
      <div key = {index}>
        <Link href={option.path}>
          <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
        </Link>
      </div>
     ))}
       </div>
       <UserButton/>
       </div>
   )
 }
 
 export default AppHeader