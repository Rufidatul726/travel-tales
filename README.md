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

## Installation

Installation and running of this project to the local machine may vary the dependencies. You may follow the Installation process :

1. Copy the URL for the repository. To clone the repository using HTTPS, under "HTTPS", click. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.To clone a repository using GitHub CLI, click GitHub CLI, then click .


2. Open Git Bash. 
3. Change the current working directory to the location where you want the cloned directory.
4. Clone the repository to your local machine using the following command:

```bash
  git clone https://github.com/your-username/your-project.git

```
5. Press Enter to create your local clone.

6. Go to the project directory

```bash
  cd project-Name

```
7. Install dependencies

```bash
  npm install

```



## Run Locally

 Start the Server
```bash
  npm run start:dev

```
This will start the development server and it will be accessible at http://localhost:port.
Port may vary from machine to machine.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATE_KEY`



## API Reference 

### Task 1


#### Create A New Trip

```http
  POST /trip/
```
* Accepts a JSON object with trip details (`place_name`, `location`, `budget`, `days`, `startDate`, and `endDate`)

#### Generate Trip Plan

```http
  POST /generate-plan/
```
* Accepts a JSON object (`TravelRequest`) with the following fields:
    * `destination`: String (e.g., "Saint Martin")
    * `user_preferences`: JSON object containing:
        * `budget` (e.g., "luxury")
        * `transport_type` (e.g., "train")
        * `meal_preference` (e.g., "vegetarian")
* The Google API key (`GOOGLE_API_KEY`) is fetched from environment variables to make external calls.
* The function checks if the destination exists in the predefined location_coordinates dictionary.
* The Google Places API is used to fetch nearby hotels based on destination coordinates.
* OpenAI's GPT-3.5-turbo model is called to generate a personalized travel itinerary based on user preferences and nearby hotel information.


### Task 2


#### Integrating A Map

```http
  GET /nominatim.openstreetmap.org/search/
```
* This API endpoint is used to search for locations based on user queries (e.g., city names, landmarks, addresses).
* The query is passed as part of the URL, and the result returns latitude and longitude coordinates for the location, which can then be plotted on a map.

#### Display Key Itinerary Information

```http
  POST /nearby-hotels/
```
* The user provides the latitude, longitude, and type of places (e.g., hotel, restaurant) they are searching for.
* The Google Places API is used to fetch nearby hotels based on the provided coordinates and search type

### Task 3


#### Integrating Weather Information

```http
  GET /api.open-meteo.com/v1/forecast/
```
* The user provides `latitude`, `longitude`, `start_date`, and `end_date` as inputs to specify the location and time range for weather data collection.
* The function sets the url to the Open Meteo API endpoint (`https://api.open-meteo.com/v1/forecast`).


### Task 4


#### Generate blog

```http
  POST /generate-blog/
```
* This function generates a travel blog based on user input and weather data.
* The weather summary and user input are combined to form a prompt, which is sent to OpenAI's GPT model to generate a creative travel blog.


### Task 5


#### Upload Images into Albums

```http
  POST /{trip_id}/{album_id}/image/
```
* This handles image uploads into specific trip albums.

#### Analyze Image for Caption Generation

```http
  POST /analyze-image/
```
* Uses OpenAI's API to analyze an image and return a description with relevant tags.

#### Search for Similar Images

```http
  POST /search-similar-images/
```
* Search for images similar to the one provided in the search query.
* The function formats the results in a list of ImageResponse objects containing the image URL and the similarity score.