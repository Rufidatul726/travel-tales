'use client'

import React, { useEffect, useState } from 'react'
import WeatherModal from './WeatherModal';
import { WeatherData } from '@/types/user';

const WeatherLists = ({lat, lon, startDate, endDate}: {lat: number, lon: number, startDate: string, endDate:string}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [allWeatherData,setAllWeatherData] = useState<WeatherData[]>([])
    const [data, setData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // await fetch('http://localhost:3005/trip/weather-status', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     latitude: 23.75,
        //     longitude: 90.375,
        //     start_date: '2024-10-24',
        //     end_date: '2024-10-29',
        //   }),
        // }).then(async (response) => {
        //     setData(await response.json())
        // })
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if(data){
        const { daily }: any = data;
        
        if(daily){
          setAllWeatherData(data)
          // setWeatherData({
          //     maxTemp: parseFloat(daily.temperature2mMax[0]).toFixed(2),
          //     minTemp: parseFloat(daily.temperature2mMin[0]).toFixed(2),
          //     sunrise: daily.sunrise[0] || '',  // Optional, handle if data is not present
          //     sunset: daily.sunset[0] || '',
          //     weatherProb: `Rain: ${(daily.rainSum[0] * 100).toFixed(2)}%, Showers: ${(daily.showersSum[0] * 100).toFixed(2)}%, Snowfall: ${(daily.snowfallSum[0] * 100).toFixed(2)}%`
          // });
            
        }
    }
  }, [data])

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      {(data as any)?.current.time.map((time : any, index: number) => {
        <WeatherModal
        key={index}
        date={time}
        maxTemp={(allWeatherData as any).temperature2mMax[index]} 
        minTemp={weatherData.minTemp} 
        sunrise={weatherData.sunrise} 
        sunset={weatherData.sunset} 
        weatherProb={weatherData.weatherProb} 
        />
      })}
    </div>
  )
}

export default WeatherLists
