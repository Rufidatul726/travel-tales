'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WeatherModal from '@/components/WeatherModal';
import { WeatherData } from '@/types/user';

const Page = () => {
  const params = useParams<{ name: string; center: string, startDate: string; endDate: string, budget: string }>()

  const [lat, lon] = params.center.split("%2C")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [dailyWeatherData, setDailyWeatherData] = useState<any>(null); 
  const [tripData, setTripData]= useState<any>(null)
  const [data, setData] = useState(null)
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('')
  const [currCenter, setCurrCenter] = useState<[number, number] | null>(null); 


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
      setAccessToken(token)
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrCenter([longitude, latitude]); // Set map center with longitude, latitude
            },
            (error) => {
                console.error('Error obtaining location:', error);
                // Fallback to a default location if permission is denied or error occurs
                setCurrCenter([0, 0]); // Example: Default to 0, 0 (the Equator)
            }
        );
    }
}, []);

  useEffect(() => {
    if(accessToken && currCenter){

      const createTrip = async () => {
        try {
          const response = await fetch('http://localhost:3005/trip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              location: [
                lat,
                lon
              ],
              current_location: [
                currCenter[0],
                currCenter[1]
              ],
              place_name: params.name,
              budget: params.budget,
              startDate: params.startDate,
              endDate: params.endDate
            }),
          });
          
          const trip_data = await response.json();

          console.log(trip_data)
          setTripData(trip_data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      
      createTrip();
    }
  }, [lat, lon, params.startDate, params.endDate]); 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:3005/trip/weather-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: lat,
            longitude: lon,
            start_date: params.startDate,
            end_date: params.endDate,
          }),
        });

        const weatherData = await response.json();
        setData(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
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
