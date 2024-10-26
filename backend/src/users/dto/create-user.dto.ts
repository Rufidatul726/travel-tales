import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user', description: 'name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  @IsString()
  password: string;
}
