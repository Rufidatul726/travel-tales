from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai_service import generate_travel_itinerary, analyze_image, generate_blog  # Import the functions
from datetime import date

# Create FastAPI instance
app = FastAPI()

# Input data model for text input
class UserInput(BaseModel):
    text: str

class UserBlog(BaseModel):
    text: str
    latitude: float
    longitude: float
    start_date: date  # Use date type for validation
    end_date: date

# Input data model for image URL
class ImageInput(BaseModel):
    image_url: str


@app.post("/analyze-image/")
async def analyze_image_endpoint(image_input: ImageInput):
    try:
        result = await analyze_image(image_input.image_url)  # If analyze_image is async
        return {"analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.post("/generate-blog/")
async def generate_blog_endpoint(user_input: UserBlog):
    try:
        result = generate_blog(  
            user_input.text, 
            user_input.latitude, 
            user_input.longitude, 
            user_input.start_date, 
            user_input.end_date
        )
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


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
        result = generate_travel_itinerary(  # Await if the function is async
            travel_request.destination, 
            travel_request.user_preferences.dict()
        )
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating travel plan: {str(e)}")
