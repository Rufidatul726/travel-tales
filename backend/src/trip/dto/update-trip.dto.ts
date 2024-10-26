import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {
    @ApiPropertyOptional({
        description: 'Location as an array of [latitude, longitude]',
        example: [23.8103, 90.4125],
        required: false,
    })
    @IsOptional()
    @IsArray()
    location?: [number, number];

    @ApiPropertyOptional({
        description: 'Budget for the trip',
        example: 500.0,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    budget?: number;

    @ApiPropertyOptional({
        description: 'Number of days for the trip',
        example: 5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    days?: number;

    @ApiPropertyOptional({
        description: 'Starting date of the trip',
        example: '2024-10-24T00:00:00.000Z',
        required: false,
    })
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @ApiPropertyOptional({
        description: 'Ending date of the trip',
        example: '2024-10-29T00:00:00.000Z',
        required: false,
    })
    @IsOptional()
    @IsDate()
    endDate?: Date;

    @ApiPropertyOptional({
        description: 'Optional description for the trip',
        example: 'A relaxing trip to Saint Martin after exams.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;
}
