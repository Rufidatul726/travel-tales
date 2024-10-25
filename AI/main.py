import os
from typing import Dict, List, Tuple
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai_service import generate_travel_itinerary, analyze_image, generate_blog, analyze_trip_mood_gpt  # Import the functions
from datetime import date
from image import find_similar_images, image_data  
from recommendation import get_nearby_places


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





class SearchQuery(BaseModel):
    query: str

class ImageResponse(BaseModel):
    url: str
    score: float


# Endpoint to search for similar images
@app.post("/search-similar-images/", response_model=List[ImageResponse])
async def search_similar_images(search_query: SearchQuery) -> List[ImageResponse]:
    try:
        similar_images: List[Tuple[str, float]] = find_similar_images(search_query.query)
        formatted_images = [ImageResponse(url=img_url, score=score) for img_url, score in similar_images]
        return formatted_images
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



class TravelRequest(BaseModel):
    destination: str
    current_latitude: float
    current_longitude: float
    budget: str
    startDate: str
    endDate: str
    transport_type: str
    meal_preference: str
    destination_latitude: float
    destination_longitude: float

@app.post("/generate-plan/")
async def generate_plan_endpoint(travel_request: TravelRequest):
    try:
        result = generate_travel_itinerary(
            travel_request.dict()
        )
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating travel plan: {str(e)}")
    


class BlogContentRequest(BaseModel):
    blog_content: str



# API endpoint to generate mood analysis
@app.post("/generate-mood/")
async def generate_mood_endpoint(blog_content_request: BlogContentRequest):
    try:
        # Generate the mood analysis from the request data
        result = generate_mood_analysis(blog_content_request.dict())
        return {"gpt_response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating mood analysis: {str(e)}")

class HotelSearch(BaseModel):
    lat: float
    long: float
    type: str
    
# Create an endpoint to search for nearby hotels
@app.post("/nearby-hotels/")
async def nearby_places(search: HotelSearch):
    try:
        api_key = os.getenv("GOOGLE_API_KEY")
        all = get_nearby_places(search.lat, search.long, search.type, api_key)
        return {"ALL": all}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")