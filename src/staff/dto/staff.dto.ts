import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class StaffDto {
  @ApiProperty({
    type: 'string',
    example: 'John',
    description: 'first name of staff',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    type: 'string',
    example: '+998901234567',
    description: 'phone number of staff',
  })
  phone_number: string;

  @ApiProperty({
    type: 'string',
    example: 'johndoe@gmail.com',
    description: 'email address of staff',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'JohnDoe',
    description: 'login of staff',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'JohnDoe1!',
    description: 'password of staff',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: 'string',
    example: 'johndoe2000',
    description: 'telegram username of staff',
  })
  telegram_username: string;

  @ApiProperty({
    type: 'string',
    example: 'teacher',
    description: 'role of staff',
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    type: 'string',
    example: 'mathematics',
    description: 'subject of staff',
  })
  subject: string;

  @ApiProperty({
    type: 'string',
    example: 'group VI',
    description: 'group of staff',
  })
  group: string;
}
