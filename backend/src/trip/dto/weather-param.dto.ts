import { IsNumber, IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherParamDto {
    @ApiProperty({
        description: 'Latitude of the location',
        example: 52.52,
    })
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty({
        description: 'Longitude of the location',
        example: 13.41,
    })
    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @ApiProperty({
        description: 'Start date in YYYY-MM-DD format',
        example: '2024-10-25',
    })
    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @ApiProperty({
        description: 'End date in YYYY-MM-DD format',
        example: '2024-11-01',
    })
    @IsDateString()
    @IsNotEmpty()
    end_date: string;
}
