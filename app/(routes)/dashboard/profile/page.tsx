"use client"
import React from 'react'
import { useUser, UserButton } from '@clerk/nextjs'

function ProfilePage() {
  const { user } = useUser();
  return (
    <div>
      <h2 className='font-bold text-2xl'>Profile</h2>
      <p className='text-sm text-gray-500'>Your account details</p>
      <div className='mt-6 border rounded-xl p-6 bg-secondary'>
        <div className='flex items-center gap-4'>
          <UserButton/>
          <div>
            <h3 className='font-semibold text-lg'>{user?.fullName || 'Anonymous'}</h3>
            <p className='text-sm text-gray-500'>{user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


