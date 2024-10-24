import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTripDto {
    @ApiProperty({
        description: 'Location as an array of [latitude, longitude]',
        example: [23.8103, 90.4125],
    })
    @IsArray()
    location: [number, number];

    @ApiProperty({
        description: 'Name of the place',
        example: "Saint Martin"
    })
    @IsString()
    place_name: string;

    @ApiProperty({
        description: 'Budget for the trip',
        example: 500.0,
    })
    @IsNumber()
    budget: number;

    @ApiProperty({
        description: 'Number of days for the trip',
        example: 5,
    })
    @IsNumber()
    days: number;

    @ApiProperty({
        description: 'Starting date of the trip',
        example: '2024-10-24T00:00:00.000Z',
    })
    @IsDate()
    startDate: Date;

    @ApiProperty({
        description: 'Ending date of the trip',
        example: '2024-10-29T00:00:00.000Z',
    })
    @IsDate()
    endDate: Date;
}
