import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input') || '';
  
  const options = {
    method: 'GET',
    hostname: 'google-map-places.p.rapidapi.com',
    port: null,
    path: `/maps/api/place/autocomplete/json?input=${input}&radius=1000&strictbounds=true&offset=3&location=40%2C-110&origin=40%2C-110&components=country%3Aus%7Ccountry%3Apr&language=en&region=en`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '', // Use an environment variable
      'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
    }
  };

  const url = 'https:\\' + options.hostname + options.path

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
    },
  })
  console.log(response)

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);



}