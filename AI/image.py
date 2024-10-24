from typing import Dict, List, Tuple
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Initialize OpenAI client with the API key from environment variables
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

image_data = {
    "http://example.com/image1.jpg": "A scenic view of mountains during sunset.",
    "http://example.com/image2.jpg": "A beautiful beach with golden sand.",
    "http://example.com/image3.jpg": "A bustling city street at night.",
    "http://example.com/image4.jpg": "A tranquil forest with tall trees.",
    "http://example.com/image5.jpg": "A vibrant flower garden in spring."
}


def find_similar_images(query: str) -> List[Tuple[str, float]]:
    results = []
    
    try:
        for image_url, description in image_data.items():
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

            # Ensure the response has the expected structure and extract the score
            if response.choices:
                score = float(response.choices[0].message.content.strip())
                results.append((image_url, score))
            else:
                print("No choices returned from the API.")
    
    except Exception as e:
        print(f"Error in GPT processing: {str(e)}")
    
    # Sort images by similarity score in descending order
    similar_images = sorted(results, key=lambda x: x[1], reverse=True)
    
    return similar_images[:3] 