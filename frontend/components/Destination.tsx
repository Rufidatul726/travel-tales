'use client'

import React, { useState, useEffect } from 'react'
import Input from './Input'
import { Result } from '@/types/user';
import Link from 'next/link';

const Destination = (
  {center, setCenter}
  : 
  {center: [number, number] | null, setCenter: React.Dispatch<React.SetStateAction<[number, number] | null>>}
) => {
  const [input, setInput] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]= useState('')
  const [budget, setBudget]=useState(0)
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
      const data = await response.json();
      
      setResults(data);
    } catch (err) {
      setError('Failed to fetch suggestions');
      console.error(err);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleSelect = (description: string, lat: number, lon: number) => {
    setInput(description);
    setResults([]);
    setCenter([lon, lat])
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center bg-white lg:rounded-full shadow-xl p-2">
        <div className="flex-1 min-w-0 px-3 py-2 relative"> {/* Add relative positioning */}
          <label htmlFor="where" className="block text-sm font-medium text-gray-700">Where</label>
          <Input
            type="text"
            id="where"
            placeholder="Search destinations"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          {results.length > 0 && (
            <ul className="absolute z-30 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-80 max-h-60 overflow-auto">
              {results && (results.map((result, index) => (
                <li 
                  key={index} 
                  className="p-4 box-border shadow-md cursor-pointer hover:bg-gray-200 overflow-hidden"
                  onClick={() => handleSelect(result.display_name, result.lat, result.lon)} // Use display_name
                >
                  <p className='m-2 '>
                    {result.display_name}
                  </p>
                </li>
              )))}
            </ul>
          )}
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">Check in</label>
          <Input
            type="date"
            id="checkin"
            placeholder="Add dates"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">Check out</label>
          <Input
            type="date"
            id="checkout"
            placeholder="Add dates"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>
        <div className="w-px bg-gray-200 hidden md:block h-10" />
        <div className="flex-1 min-w-0 px-3 py-2">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
          <select
            id="budget"
            className="w-full bg-transparent p-0 text-gray-900 focus:ring-0 focus:border-0 border-none sm:text-sm"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "low") setBudget(1);
              else if (value === "medium") setBudget(2);
              else if (value === "luxury") setBudget(3);
            }}
            value={budget === 1 ? "low" : budget === 2 ? "medium" : budget === 3 ? "luxury" : ""}
          >
            <option value="" disabled>Select your budget</option>
            <option value="low" className="text-gray-900">Low</option>
            <option value="medium" className="text-gray-900">Medium</option>
            <option value="luxury" className="text-gray-900">Luxury</option>
          </select>
          {/* <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
          <Input
            type="text"
            id="budget"
            placeholder="Add budget"
            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-500 sm:text-sm"
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
          /> */}
        </div>
        <Link href={`/searchDetails/${input}/${center}/${startDate}/${endDate}/${budget}`} className="cursor-pointer mt-3 sm:mt-0 w-full sm:w-auto px-4 py-3 bg-gray-500 hover:bg-black text-white font-semibold rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="sr-only">Search</span>
        </Link>
      </div>
    </div>
  )
}

export default Destination;
