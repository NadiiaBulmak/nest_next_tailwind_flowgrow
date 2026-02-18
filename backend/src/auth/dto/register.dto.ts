import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User name',
    example: 'User',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'At least 6 characters' })
  password: string;
}
