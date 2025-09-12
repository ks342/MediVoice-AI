 import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
 

const menuOptions=[
  {
    id:1,
    name:'Home',
    path:'/home'
  },
   {
    id:2,
    name:'History',
    path:'/History'
  },
   {
    id:3,
    name:'Pricing',
    path:'/pricing'
  },
   {
    id:4,
    name:'profile',
    path:'/profile'
  } 
]

 function AppHeader() {
   return (
     <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
      <Image src ={'/logo.svg'} alt='logo' width={180} height ={120} ></Image>
   <div className='hidden md:flex gap-12 items-center'>
     {menuOptions.map((option,index)=>(
      <div key = {index}>
         <h2 className='hover:font-bold cursor-pointer trasnition-all'>{option.name}</h2>
      </div>
     ))}
       </div>
       <UserButton/>
       </div>
   )
 }
 
 export default AppHeader