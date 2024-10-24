
import requests

def get_nearby_places(lat: float, long: float, type: str, api_key: str):
    try:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius=1500&type={type}&key={api_key}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json().get('results', [])
    except Exception as e:
        raise Exception(f"Error fetching nearby hotels: {str(e)}")
    

