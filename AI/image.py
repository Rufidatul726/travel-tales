from typing import List, Tuple
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Initialize OpenAI client with the API key from environment variables
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Correct data structure for image_data
image_data = [
    {"url": "http://example.com/image1.jpg", "description": "A scenic view of mountains during sunset."},
    {"url": "http://example.com/image2.jpg", "description": "A beautiful beach with golden sand."},
    {"url": "http://example.com/image3.jpg", "description": "A bustling city street at night."},
    {"url": "http://example.com/image4.jpg", "description": "A tranquil forest with tall trees."},
    {"url": "http://example.com/image5.jpg", "description": "A vibrant flower garden in spring."}
]

def find_similar_images(query: str) -> List[Tuple[str, float]]:
    results = []
    
    try:
        for image in image_data:
            image_url = image["url"]
            description = image["description"]
            
            # Make a request to the OpenAI API to get the similarity score
            response = client.chat.completions.create(
                model="gpt-4o-mini",  # Model to use
                messages=[
                    {
                        "role": "user",
                        "content": f"Given this image description: '{description}', how similar is it to this query: '{query}'? Provide a similarity score from 0 to 1."
                    }
                ],
                max_tokens=10,
                temperature=0.7
            )

            # Extract the score from the response (GPT-4 responses can have a nested structure)
            if response.choices and response.choices[0].message:
                score_text = response.choices[0].message.get('content', '').strip()
                
                # Attempt to convert the score to a float
                try:
                    score = float(score_text)
                    results.append((image_url, score))
                except ValueError:
                    print(f"Invalid score '{score_text}' for image: {image_url}")
            else:
                print(f"No valid response for image: {image_url}")

    except Exception as e:
        print(f"Error in GPT processing: {str(e)}")
    
    # Sort images by similarity score in descending order
    similar_images = sorted(results, key=lambda x: x[1], reverse=True)
    print(similar_images[:3])
    return similar_images[:3]  # Return the top 3 similar images
