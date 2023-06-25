import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'adam@gmail.com',
    description: "student's email address",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith0!',
    description: "student's password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
