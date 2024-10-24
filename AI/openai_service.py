import base64
from openai import OpenAI
from dotenv import load_dotenv
import os
from weather_data import get_weather_data

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


def generate_travel_itinerary(destination: str, user_preferences: dict):
    try:
        # Extract user preferences from the input dictionary
        budget = user_preferences.get("budget", "mid-range")
        duration = user_preferences.get("duration", "7 days")
        travel_type = user_preferences.get("travel_type", "leisure")  # leisure or business
        transport_type = user_preferences.get("transport_type", "flight")
        meal_preference = user_preferences.get("meal_preference", "local cuisine")

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a travel assistant that creates personalized travel itineraries based on user preferences."},
                {"role": "user", "content": f"I want to travel to {destination}. My preferences are: \n"
                                            f"Budget: {budget}\n"
                                            f"Duration: {duration}\n"
                                            f"Travel Type: {travel_type}\n"
                                            f"Preferred Transport: {transport_type}\n"
                                            f"Meal Preference: {meal_preference}\n"
                                            f"Please suggest a basic itinerary including transport options, accommodation, meal plans, and estimated cost breakdown."}
            ]
        )

        # Return the assistant's response
        return completion.choices[0].message.content

    except Exception as e:
        raise Exception(f"Error generating travel itinerary: {str(e)}")

# Define user preferences
location = "Saint Martin"
user_preferences = {
    "budget": "luxury",
    "duration": "5 days",
    "travel_type": "leisure",
    "transport_type": "flight",
    "meal_preference": "vegetarian"
}


# itinerary = generate_travel_itinerary(location, user_preferences)



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
