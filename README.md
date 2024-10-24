# TravelTales

**TravelTales** is an AI-powered travel planning platform that helps users easily organize trips, generate itineraries, and keep track of travel logistics. With features like real-time weather notifications, map integration, and budget estimations, TravelTales ensures a seamless and stress-free travel experience.

## Features

- **Itinerary Generation**: Enter a destination and receive transport, meal, and accommodation suggestions, tailored to your preferences.
- **Map Integration**: Visualize key locations (transport, hotels, restaurants) and route suggestions using Google Maps or OpenStreetMap.
- **Real-Time Weather Notifications**: Stay updated with weather forecasts for your destination during your travel dates.
- **Trip Blog**: Automatically generate a personalized blog after the trip, highlighting key moments.
- **Image Upload & Search**: Upload trip photos and use natural language search to quickly find specific images.
- **Automated Travel Vlog**: Create a travel vlog based on your trip itinerary and uploaded media, with customizable background music and captions.

## Demo

You can view the live demo of **TravelTales** [here](#).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TravelTales.git
   cd TravelTales
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following keys:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Nestjs
- **APIs**: Google Maps API, OpenWeatherMap API, Firebase Storage
- **Other Tools**: FFmpeg (for video generation), Google Vision API (for image tagging)

## Usage

1. **Plan a Trip**: Enter your destination, budget, and preferences. TravelTales will generate an itinerary for you.
2. **View Map**: Visualize locations and routes on an interactive map.
3. **Check Weather**: Get real-time weather updates for your trip.
4. **Upload Images**: Organize your trip photos and use natural language queries to search for them.
5. **Generate Blog & Vlog**: After your trip, create a blog and a travel vlog to relive your journey.

## Contributing

We welcome contributions to **TravelTales**! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.