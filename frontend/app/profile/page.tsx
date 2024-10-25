'use client'

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth');
      } else {
        setIsAuthenticated(true);


      }
    }, [router]);

    const handleSignOut = () => {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      router.push('/');
    }
    
  return (
    <div className="max-container">
        <div className="flex flex-col justify-center items-center">
           <Button
            type='button'
            title='Sign out'
            variant='btn_green'
            onClick={handleSignOut}
           />
        </div>
    </div>
  )
}

export default Page
