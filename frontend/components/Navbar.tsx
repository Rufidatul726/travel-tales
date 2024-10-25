'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { NAV_LINKS } from '@/constants'
import Button from './Button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
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

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    if(!isAuthenticated){
      router.push('/auth');
    }else{
      router.push('/profile')
    }
  }

  return (
    <nav className='flex items-center justify-between max-container padding-container relative z-30 py-5'>
      <Link href="/">
        <Image src="/travel-logo.svg" alt="logo" width={74} height={29} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {isAuthenticated && (
          <Button 
            type="button"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLogin}
          />
        )}
        {!isAuthenticated && (
          <Button 
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLogin}
          />
        )
        }
        
      </div>

      <Image 
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  )
}


export default Navbar