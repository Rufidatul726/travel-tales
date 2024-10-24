
import requests

def get_nearby_hotels(lat: float, long: float, api_key: str):
    try:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius=1500&type=hotel&key={api_key}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json().get('results', [])
    except Exception as e:
        raise Exception(f"Error fetching nearby hotels: {str(e)}")
    

def get_nearby_restaurants(lat: float, long: float, api_key: str):
    try:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius=1500&type=restaurants&key={api_key}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json().get('results', [])
    except Exception as e:
        raise Exception(f"Error fetching nearby hotels: {str(e)}")
