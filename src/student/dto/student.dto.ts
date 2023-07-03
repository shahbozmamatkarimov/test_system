import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  IsNumber,
} from 'class-validator';

export class StudentDto {
  @ApiProperty({
    type: 'string',
    example: 'John Doe Smith',
    description: "student's full name",
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    type: 'string',
    example: '+998991112233',
    description: "student's phone number",
  })
  phone_number: string;

  @ApiProperty({
    type: 'string',
    example: 'adam@gmail.com',
    description: "student's email address",
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'adamsmith',
    description: "student's username",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith0!',
    description: "student's password",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: 'string',
    example: 'Adams',
    description: "student's telegram username",
  })
  telegram_username: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: "student's group id",
  })
  @IsNotEmpty()
  @IsNumber()
  group_id: number;
}
