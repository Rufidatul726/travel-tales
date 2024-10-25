'use client'

import React from 'react'

const WeatherModal = ({ date, maxTemp, minTemp, sunrise, sunset, weatherProb }: { date :string, maxTemp: string, minTemp: string, sunrise: string | null, sunset:string | null, weatherProb: string }) => {
  console.log(sunrise)
  
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Weather Forecast</h2>

        <div className="flex flex-col justify-end items-end">
          {date.split('T')[0]}
        </div>

        <div className="flex justify-between">
          <div className="text-gray-700">
            <p className="text-sm">Max Temp</p>
            <p className="text-lg font-semibold">{maxTemp}°C</p>
          </div>
          <div className="text-gray-700">
            <p className="text-sm">Min Temp</p>
            <p className="text-lg font-semibold">{minTemp}°C</p>
          </div>
        </div>

        {sunrise!==undefined &&
            <div className="flex justify-between mt-4">
            <div className="text-gray-700">
                <p className="text-sm">Sunrise</p>
                <p className="text-lg font-semibold">{sunrise}</p>
            </div>
            <div className="text-gray-700">
                <p className="text-sm">Sunset</p>
                <p className="text-lg font-semibold">{sunset}</p>
            </div>
            </div>
        }

        <div className="mt-4">
          <p className="text-sm text-gray-700">Weather Probability</p>
          <p className="text-lg font-semibold">{weatherProb}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherModal
