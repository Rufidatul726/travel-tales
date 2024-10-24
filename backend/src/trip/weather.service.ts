
// weather.service.ts
import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { fetchWeatherApi } from 'openmeteo';
import * as moment from 'moment';
import { WeatherData, Location } from './weather.types';

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);

    constructor(private readonly prisma: PrismaService) { }

    private range(start: number, stop: number, step: number): number[] {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    }

    private validateDates(startDate: Date, endDate: Date): void {
        if (endDate < startDate) {
            throw new BadRequestException('End date must be after start date');
        }

        const maxDaysRange = 7; // Open-meteo free tier limitation
        const daysDiff = moment(endDate).diff(moment(startDate), 'days');
        if (daysDiff > maxDaysRange) {
            throw new BadRequestException(`Date range cannot exceed ${maxDaysRange} days`);
        }
    }

    private validateLocation(location: Location): void {
        if (!location?.latitude || !location?.longitude) {
            throw new BadRequestException('Invalid location coordinates');
        }

        if (location.latitude < -90 || location.latitude > 90) {
            throw new BadRequestException('Invalid latitude value');
        }

        if (location.longitude < -180 || location.longitude > 180) {
            throw new BadRequestException('Invalid longitude value');
        }
    }

    async getWeatherInfo(tripId): Promise<WeatherData> {
        try {
            const trip = await this.prisma.trips.findUnique({
                where: { id: tripId },
            });

            if (!trip) {
                throw new NotFoundException(`Trip with ID ${tripId} not found`);
            }

            const startDate = moment(trip.start_date).toDate();
            const endDate = moment(trip.endDate).toDate();

            this.validateDates(startDate, endDate);
            this.validateLocation(trip.location as any);

            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

            this.logger.debug(`Fetching weather data for dates: ${formattedStartDate} to ${formattedEndDate}`);

            const params = {
                latitude: trip.location['latitude'],
                longitude: trip.location['longitude'],
                current: ['temperature_2m', 'rain', 'showers', 'snowfall'],
                daily: [
                    'temperature_2m_max',
                    'temperature_2m_min',
                    'sunrise',
                    'sunset',
                    'rain_sum',
                    'showers_sum',
                    'snowfall_sum',
                ],
                timezone: 'auto',
                start_date: formattedStartDate,
                end_date: formattedEndDate,
            };

            const url = 'https://api.open-meteo.com/v1/forecast';
            const responses = await fetchWeatherApi(url, params);

            if (!responses?.length) {
                throw new BadRequestException('Failed to fetch weather data');
            }

            const response = responses[0];
            const utcOffsetSeconds = response.utcOffsetSeconds();

            const current = response.current();
            const daily = response.daily();

            if (!current || !daily) {
                throw new BadRequestException('Invalid weather data received');
            }

            const weatherData: WeatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0)?.value() ?? 0,
                    rain: current.variables(1)?.value() ?? 0,
                    showers: current.variables(2)?.value() ?? 0,
                    snowfall: current.variables(3)?.value() ?? 0,
                },
                daily: {
                    time: this.range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000),
                    ),
                    temperature2mMax: daily.variables(0)?.valuesArray() ?? new Float32Array(),
                    temperature2mMin: daily.variables(1)?.valuesArray() ?? new Float32Array(),
                    sunrise: daily.variables(2)?.valuesArray() ?? new Float32Array(),
                    sunset: daily.variables(3)?.valuesArray() ?? new Float32Array(),
                    rainSum: daily.variables(4)?.valuesArray() ?? new Float32Array(),
                    showersSum: daily.variables(5)?.valuesArray() ?? new Float32Array(),
                    snowfallSum: daily.variables(6)?.valuesArray() ?? new Float32Array(),
                },
                metadata: {
                    timezone: response.timezone(),
                    timezoneAbbreviation: response.timezoneAbbreviation(),
                    latitude: response.latitude(),
                    longitude: response.longitude(),
                },
            };

            return weatherData;
        } catch (error) {
            this.logger.error(`Error fetching weather data: ${error.message}`, error.stack);
            throw error;
        }
    }
}