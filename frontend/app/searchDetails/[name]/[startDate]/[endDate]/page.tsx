'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WeatherModal from '@/components/WeatherModal';
import { WeatherData } from '@/types/user';

const Page = () => {
  const params = useParams<{ name: string; startDate: string; endDate: string }>()

  const [lat, lon] = params.name.split("%2C")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [dailyWeatherData, setDailyWeatherData] = useState<any>(null); // Changed from WeatherData[] to 'any' to match API response
  const [data, setData] = useState(null)

  useEffect(() => {
  }, [lat, lon, params.startDate, params.endDate]); // Dependencies updated

  useEffect(() => {
    if (data && (data as any).daily) {
      const { daily }: any = data;
      setDailyWeatherData(daily);
    }
  }, [data]);

  if (!dailyWeatherData) return <div>Loading...</div>; // Wait until data is ready

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      {dailyWeatherData?.time.map((time: string, index: number) => (
        <WeatherModal
          key={index}
          date={time}
          maxTemp= {parseFloat(dailyWeatherData.temperature2mMax[index]).toFixed(2)} 
          minTemp={parseFloat(dailyWeatherData.temperature2mMin[index]).toFixed(2)}
          sunrise={dailyWeatherData.sunrise ? dailyWeatherData.sunrise[index] : "N/A"} 
          sunset={dailyWeatherData.sunset ? dailyWeatherData.sunset[index] : "N/A"} 
          weatherProb={`Rain: ${(dailyWeatherData.rainSum[0] * 100).toFixed(2)}%, Showers: ${(dailyWeatherData.showersSum[0] * 100).toFixed(2)}%, Snowfall: ${(dailyWeatherData.snowfallSum[0] * 100).toFixed(2)}%`} 
        />
      ))}
    </div>
  )
}

export default Page;
