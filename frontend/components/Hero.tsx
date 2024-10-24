'use client'

import React from 'react'
import Destination from './Destination'
import MapImplementation from './MapImplementation'
import LeftHero from './LeftHero'

const Hero = () => {
  return (
    <div className='max-container'>
      <Destination/>
      <div className="flex lg:flex-row flex-col justify-center">
          <LeftHero/>
        <div className="relative lg:h-[75vh] h-screen top-[-3rem] z-[-1] lg:w-1/2 w-screen">
          <MapImplementation/>
        </div>
      </div>
    </div>
  )
}

export default Hero
