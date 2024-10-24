export type User = {
    id? : string | null;
    name? : string | null;
    email? : string | null;
    password? : string | null;
    confirm_password? : string | null;
}

export type UserInfoProps = {
    user: User;
}

export type Result = {
    address? : object
    boundingbox?: Number[] | [0,0,0,0]
    display_name: string | ''
    lat: number | 0
    lon: number | 0
    name: string | ''
}

// Define the type for your weather data
export type WeatherData = {
    maxTemp: string;
    minTemp: string;
    sunrise: string | null;
    sunset: string | null;
    weatherProb: string;
  };
  