export interface Location {
    latitude: number;
    longitude: number;
}

export interface WeatherCurrentData {
    time: Date;
    temperature2m: number;
    rain: number;
    showers: number;
    snowfall: number;
}

export interface WeatherDailyData {
    time: Date[];
    temperature2mMax: Float32Array;
    temperature2mMin: Float32Array;
    sunrise: Float32Array;
    sunset: Float32Array;
    rainSum: Float32Array;
    showersSum: Float32Array;
    snowfallSum: Float32Array;
}

export interface WeatherData {
    current: WeatherCurrentData;
    daily: WeatherDailyData;
    metadata: {
        timezone: string;
        timezoneAbbreviation: string;
        latitude: number;
        longitude: number;
    };
}