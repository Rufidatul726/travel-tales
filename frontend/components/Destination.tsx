'use client'

import React from 'react'
import Input from './Input'
import Button from './Button'

const Destination = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center bg-white lg:rounded-full shadow-xl p-2">
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="where" className="block text-sm font-medium text-gray-700">Where</label>
          <Input
            type="text"
            id="where"
            placeholder="Search destinations"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
          />
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">Check in</label>
          <Input
            type="text"
            id="checkin"
            placeholder="Add dates"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
          />
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">Check out</label>
          <Input
            type="text"
            id="checkout"
            placeholder="Add dates"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
          />
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Who</label>
          <Input
            type="text"
            id="guests"
            placeholder="Add guests"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
          />
        </div>
        <div className=" cursor-pointer mt-3 sm:mt-0 w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-black text-white font-semibold rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          <span className="sr-only">Search</span>
        </div>
      </div>
    </div>
  )
}

export default Destination
