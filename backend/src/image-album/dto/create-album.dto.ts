import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateAlbumDto {
    @ApiProperty({ description: 'Title of the album' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Optional description of the album', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}