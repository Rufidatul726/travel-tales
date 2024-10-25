'use client'

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
    
  return (
    <div className="max-container flex flex-1">
        <div className="flex flex-col">
            
        </div>
    </div>
  )
}

export default Page
