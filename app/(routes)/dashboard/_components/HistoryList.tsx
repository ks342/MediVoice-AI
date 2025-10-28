"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog';

function HistoryList(){
    const[historyList,setHistoryList]  =useState<any[]>([]);
  return (
    <div className='mt-10'>
        {historyList.length == 0?
        <div className='flex items-center flex-col justify-between p-7 border border-dashed rounded-2xl border-2 '>
            <Image src={'/medical-assistance.png'} alt="empty" width={150} height={150}></Image>
            <h2 className='font-bold text-xl mt-2'>No recent conversations</h2>
            <p>It looks like you haven&apos;t consulted with any doctors yet.</p>
          <AddNewSessionDialog />
</div>
:<div>List</div>
}
    </div>
  )
} 
export default HistoryList