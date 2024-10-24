# weather_data.py

import openmeteo_requests
import requests_cache
import pandas as pd
import numpy as np
from retry_requests import retry

def get_weather_data(latitude, longitude, start_date, end_date):
    # cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    # retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client()

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": ["temperature_2m_max", "temperature_2m_min", "rain_sum", "showers_sum", "snowfall_sum"],
        "timezone": "auto",
        "start_date": start_date,
        "end_date": end_date
    }
    
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    # Process daily data
    daily = response.Daily()
    daily_data = {
        "temperature_2m_max": daily.Variables(0).ValuesAsNumpy(),
        "temperature_2m_min": daily.Variables(1).ValuesAsNumpy(),
        "rain_sum": (daily.Variables(2).ValuesAsNumpy() * 100).astype(np.float64),
        "showers_sum": (daily.Variables(3).ValuesAsNumpy() * 100).astype(np.float64),
        "snowfall_sum": (daily.Variables(4).ValuesAsNumpy() * 100).astype(np.float64),

        "date": pd.date_range(
            start=pd.to_datetime(daily.Time(), unit="s", utc=True),
            end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=daily.Interval()),
            inclusive="left"
        )
    }

    # Return as a DataFrame for further processing or string formatting
    daily_dataframe = pd.DataFrame(data=daily_data)
    return daily_dataframe
