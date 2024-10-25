import base64
from openai import OpenAI
from dotenv import load_dotenv
import os
from weather_data import get_weather_data
from recommendation import get_nearby_places


load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_image(image_url: str):
    try:
        # Call OpenAI API to analyze the image
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Describe this image in short. extract tags as a list at the end"},
                        {
                            "type": "image_url",
                            "image_url": {"url": image_url},
                        },
                    ],
                }
            ],
            max_tokens=300,
        )

        # Return the response content
        return response.choices[0].message.content

    except Exception as e:
        raise Exception(f"Error analyzing image: {str(e)}")


def generate_travel_itinerary(user_preferences: dict):
    try:
        # Extract user preferences from the input dictionary
        budget = user_preferences.get("budget", "2")
        startDate = user_preferences.get("startDate", "")
        endDate = user_preferences.get("endDate", "")
        transport_type = user_preferences.get("transport_type", "bus")
        meal_preference = user_preferences.get("meal_preference", "local cuisine")
        current_latitude = user_preferences.get("current_latitude", "")
        current_longitude = user_preferences.get("current_longitude", "")
        destination = user_preferences.get("desctination", "")
        destination_latitude = user_preferences.get("destination_latitude", "")
        destination_longitude = user_preferences.get("destination_longitude", "")

        api_key = os.getenv("GOOGLE_API_KEY")


        nearby_hotels = get_nearby_places(destination_latitude, destination_longitude, api_key)

        # Create a summary of nearby hotels for the prompt
        hotels_summary = ""
        if nearby_hotels:
            hotels_summary = "Here are some nearby hotels:\n"
            for hotel in nearby_hotels:
                hotels_summary += f"- {hotel.get('name')}, Rating: {hotel.get('rating', 'N/A')}, Address: {hotel.get('vicinity')}\n"
        else:
            hotels_summary = "No nearby hotels found."

        # Call OpenAI API for generating a travel itinerary
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a travel assistant that creates personalized travel itineraries based on user preferences. Budget={1,2,3}={budget, mid-range, luxury}"},
                {"role": "user", "content": f"I want to travel to {destination} with cordinate {destination_latitude}, {destination_longitude} from {startDate} to {endDate}. My preferences are: \n"
                                            f"Budget: {budget}\n"
                                            f"Preferred Transport: {transport_type}\n"
                                            f"Meal Preference: {meal_preference}\n"
                                            f"{hotels_summary}\n"
                                            f"Start point coordinates: {current_latitude}, {current_longitude}\n"
                                            f"Please suggest a basic itinerary including transport options, accommodation, meal plans, and estimated cost breakdown."}
            ]
        )

        # Return the assistant's response
        return completion.choices[0].message.content

    except Exception as e:
        raise Exception(f"Error generating travel itinerary: {str(e)}")

# Define user preferences
user_preferences = {
    "destination" : "Saint Martin",
    "current_latitude" : 23.7271143,
    "current_longitude" : 90.3860279,
    "budget": "3",
    "startDate": "2024-10-10",
    "endDate": "2024-10-15",
    "transport_type": "flight",
    "meal_preference": "vegetarian",
    "destination_latitude": 23.7271143,
    "destination_longitude": 90.3860279,
}



# itinerary = generate_travel_itinerary(destination, user_preferences, current_latitude, current_longitude)
# print(itinerary)


def generate_blog(user_input: str, latitude: float, longitude: float, start_date: str, end_date: str):
    try:
        weather_df = get_weather_data(latitude, longitude, start_date, end_date)
        print(weather_df)

        if weather_df is None or weather_df.empty:
            raise Exception("No weather data found for the given coordinates and dates.")

        weather_summary = ""
        for index, row in weather_df.iterrows():
            weather_summary += f"Date: {row['date']}, Max Temp: {row['temperature_2m_max']}°C, Min Temp: {row['temperature_2m_min']}°C, " \
                               f"Rain: {row['rain_sum']}%, Snow: {row['snowfall_sum']}%, Shower: {row['showers_sum']}%, Snowfall: {row['snowfall_sum']}mm.\n"

        combined_prompt = f"Here is the weather forecast for the trip:\n{weather_summary}\n\nNow, write a creative travel blog based on the following itinerary:\n{user_input}"

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a virtual assistant to write creative travel blogs from suggested itinerary."},
                {"role": "user", "content": combined_prompt}
            ]
        )

        # Return the assistant's response
        return completion.choices[0].message.content


    except Exception as e:
        raise Exception(f"Error generating blog: {str(e)}")
