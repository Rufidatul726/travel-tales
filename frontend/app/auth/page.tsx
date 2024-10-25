// auth\page.tsx

"use client";

import React, {useState} from 'react'
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

const page = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const click_signup = async (e: React.MouseEvent) => {
    e.preventDefault();
  
    if (!user?.name || !user?.email || !user?.password || !user?.confirm_password) {
      alert("Please fill in all fields");
      return;
    }
  
    if (user.password !== user.confirm_password) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3005/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to sign up');
      }
  
      const data = await res.json();

      const { accessToken, refreshToken } = data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      router.push('/')
      
    } catch (error) {
      console.error(error);
    }
  };

  const click_signin = async (e: React.MouseEvent) => {
      e.preventDefault();

      if (!user?.email || !user?.password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const res = await fetch('http://localhost:3005/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        });
        if (!res.ok) {
          throw new Error('Failed to sign in');
        }
    
        const data = await res.json();
  
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
  
        router.push('/')
      } catch (error) {
        console.error(error);
      }

  }
  

  return (
    <div className="font-sans bg-white mt-28">
      <div className="relative w-[900px] h-[550px] mx-auto mb-24 bg-white rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(70,70,70,0.15)]">
        <div className={`absolute top-0 left-0 w-[640px] h-full transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-[640px]' : ''}`}>
          <div className="p-12">
            <h2 className="text-2xl text-center mb-8">Welcome to <span className='text-green-50 font-bold'>Travel Tales!</span></h2>
            <div className="w-64 mx-auto space-y-6">
              <label className="block text-center">
                <span className="text-xs text-gray-400 uppercase">Email</span>
                <input type="email" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.email ?? ''} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
              </label>
              <label className="block text-center">
                <span className="text-xs text-gray-400 uppercase">Password</span>
                <input type="password" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.password ?? ''} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              </label>
              <button className="w-full py-2 bg-green-500 text-white rounded-full uppercase" onClick={click_signin}>Sign In</button>
            </div>
          </div>
        </div>
        <div className={`absolute top-0 left-[640px] w-[900px] h-full bg-white transition-transform duration-1000 ease-in-out ${isSignUp ? '-translate-x-[640px]' : ''}`}>
          <div className="absolute left-0 top-0 w-[260px] h-full overflow-hidden">
            {/* <div className="absolute inset-0 bg-[url('/ext.jpg')] bg-cover opacity-80"></div> */}
            <div className="absolute inset-0 bg-green-950 bg-opacity-80"></div>
            <div className="relative z-10 pt-12 px-5 text-center text-white">
              <h3 className="mb-4">{isSignUp ? "If you already have an account, just sign in." : "Don't have an account? Please Sign up!"}</h3>
              <button onClick={toggleSignUp} className="relative w-24 h-9 mt-20 mx-auto text-sm uppercase">
                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${isSignUp ? 'translate-y-0' : '-translate-y-full translate-x-[640px]'}`}>Sign In</span>
                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${isSignUp ? 'translate-y-full -translate-x-[640px]' : 'translate-y-0'}`}>Sign Up</span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-[260px] w-[640px] h-full">
            <div className="p-12">
              <h2 className="text-2xl text-center mb-8">Create your Account to join <span className='text-green-50 font-bold'>Travel Tales!</span></h2>
              <div className="w-64 mx-auto space-y-6">
                <label className="block text-center">
                  <span className="text-xs text-gray-400 uppercase">Name</span>
                  <input type="text" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.name ?? ''} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                </label>
                <label className="block text-center">
                  <span className="text-xs text-gray-400 uppercase">Email</span>
                  <input type="email" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.email ?? ''} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                </label>
                <label className="block text-center">
                  <span className="text-xs text-gray-400 uppercase">Password</span>
                  <input type="password" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.password ?? ''} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                </label>
                <label className="block text-center">
                  <span className="text-xs text-gray-400 uppercase">Confirm Password</span>
                  <input type="password" className="block w-full mt-1 text-center border-b border-gray-400 hover:border-b outline-none" value={user?.confirm_password ?? ''} onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}/>
                </label>
                <button className="w-full py-2 bg-green-50 text-white rounded-full uppercase" onClick={click_signup}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page