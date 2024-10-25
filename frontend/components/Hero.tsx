'use client'

import React, { useEffect, useState } from 'react'
import Destination from './Destination'
import MapImplementation from './MapImplementation'
import LeftHero from './LeftHero'
import OpenStreetMap from './OpenStreetMap'

const Hero = () => {
  const [center, setCenter] = useState<[number, number] | null>(null); 

    useEffect(() => {
      if (typeof window !== 'undefined' && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setCenter([longitude, latitude]); // Set map center with longitude, latitude
              },
              (error) => {
                  console.error('Error obtaining location:', error);
                  // Fallback to a default location if permission is denied or error occurs
                  setCenter([0, 0]); // Example: Default to 0, 0 (the Equator)
              }
          );
      }
  }, []);

  return (
    <div className='max-container'>
      <Destination center={center} setCenter={setCenter}/>
      <div className="flex lg:flex-row flex-col justify-center">
          <LeftHero/>
        <div className="relative lg:h-[75vh] h-screen top-[-3rem] z-[-1] lg:w-1/2 w-screen">
          <MapImplementation  center={center} setCenter={setCenter}/>
          
        </div>
      </div>
    </div>
  )
}

export default Hero
