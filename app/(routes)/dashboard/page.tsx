import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'

function Dashboard() {
  return (
    <div>
      <div className='flex justify-between items-center'>
 <h2 font-bold text-2xl >My Dashboard</h2>  
 <Button>+ Consult with Doctor</Button>
      </div>
     
      <HistoryList/>
      </div>
  )
}

export default Dashboard