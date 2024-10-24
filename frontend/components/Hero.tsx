'use client'

import React from 'react'
import Destination from './Destination'
import MapImplementation from './MapImplementation'

const Hero = () => {
  return (
    <div>
      <Destination/>
      <div className="relative h-screen top-[-3rem] z-[-1]">
        <MapImplementation/>
      </div>
    </div>
  )
}

export default Hero
