import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: 'string',
    example: 'Adam',
    description: "student's first name",
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    type: 'string',
    example: 'Smith',
    description: "student's last name",
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    type: 'string',
    example: '+998991112233',
    description: "student's phone number",
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    type: 'string',
    example: 'adam@gmail.com',
    description: "student's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'adamsmith',
    description: "student's username",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith0!',
    description: "student's password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: "student's group id",
  })
  @IsNotEmpty()
  group_id: number;
}
