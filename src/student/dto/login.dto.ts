import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'adamsmith',
    description: "student's email address",
  })
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith0!',
    description: "student's password",
  })
  @IsNotEmpty()
  password: string;
}
