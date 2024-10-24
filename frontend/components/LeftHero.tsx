import React from 'react'
import Image from 'next/image'
import Button from './Button'

const LeftHero = () => {
  return (
    <div>
      {/* <div className='hero-map'/> */}
      <div className='relative z-20 flex flex-1 flex-col jus xl:w-full p-6'>
        <Image
          src="/camp.svg"
          alt='camp'
          width={50}
          height={50}
          className='absolute left-[-5px] top-[-55px] w-10 lg:w-[50px] xl:w-[70px]'
        />
        <h1 className='bold-52 lg:bold-88'>Travel Tales</h1>
        <p className='regular-16 text-gray-30 mt-6 xl:max-w-[520px]'>
         Travel Tales is an AI-powered travel planning platform that helps users easily organize trips, generate itineraries, and keep track of travel logistics. With features like real-time weather notifications, map integration, and budget estimations, TravelTales ensures a seamless and stress-free travel experience.</p>
          
        <div className='flex flex-col w-1/2 py-4 gap-2 sm:flex-row'>
          <Button
            type='button'
            title='Planning for a new trip? Let&apos;s Go!'
            variant='btn_green'
          />
        </div>

      </div>
    </div>
  )
}

export default LeftHero
