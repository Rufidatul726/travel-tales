from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai_service import generate_travel_itinerary, analyze_image, generate_chat  # Import the functions

# Create FastAPI instance
app = FastAPI()

# Input data model for text input
class UserInput(BaseModel):
    text: str

# Input data model for image URL
class ImageInput(BaseModel):
    image_url: str


# POST endpoint to analyze image
@app.post("/analyze-image/")
async def analyze_image_endpoint(image_input: ImageInput):
    try:
        result = analyze_image(image_input.image_url)
        return {"analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# POST endpoint for virtual therapy
@app.post("/genenrate-chat/")
async def generate_chat_endpoint(user_input: UserInput):
    try:
        result = generate_chat(user_input.text)
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



app = FastAPI()

# Define input models
class UserPreferences(BaseModel):
    budget: str
    duration: str
    travel_type: str
    transport_type: str
    meal_preference: str

class TravelRequest(BaseModel):
    destination: str
    user_preferences: UserPreferences

@app.post("/generate-plan/")
async def generate_plan_endpoint(travel_request: TravelRequest):
    try:
        # Call the generate_travel_itinerary function with the destination and preferences
        result = generate_travel_itinerary(travel_request.destination, travel_request.user_preferences.dict())
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating travel plan: {str(e)}")

