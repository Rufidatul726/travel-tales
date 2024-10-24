import base64
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize OpenAI client
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
                        {"type": "text", "text": "What’s in this image?"},
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

        # Call OpenAI API for generating a travel itinerary
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
user_preferences = {
    "budget": "luxury",
    "duration": "5 days",
    "travel_type": "leisure",
    "transport_type": "flight",
    "meal_preference": "vegetarian"
}

# Call the function with "Saint Martin" and user preferences
itinerary = generate_travel_itinerary("Saint Martin", user_preferences)

# Print the generated itinerary
print(itinerary)


def generate_chat(user_input: str):
    try:
        # Call OpenAI API for virtual therapy
        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are a virtual assistant that gives therapy to people who are feeling down."},
                {"role": "user", "content": user_input}
            ]
        )

        # Return the assistant's response
        return completion.choices[0].message.content

    except Exception as e:
        raise Exception(f"Error providing virtual therapy: {str(e)}")
