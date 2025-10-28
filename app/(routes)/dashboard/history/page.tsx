import React from 'react'
import HistoryList from '../_components/HistoryList'

function HistoryPage() {
  return (
    <div>
      <h2 className='font-bold text-2xl'>History</h2>
      <p className='text-sm text-gray-500'>Your past consultations</p>
      <div className='mt-6'>
        <HistoryList/>
      </div>
    </div>
  )
}

export default HistoryPage


