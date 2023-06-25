import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: 'string',
    example: 'admin1',
    description: "admin's username",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'admin@gmail.com',
    description: "admin's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Admin001!',
    description: "admin's password",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: 'string',
    example: '+998901234567',
    description: "admin's phone number",
  })
  @IsPhoneNumber()
  phone: string;
}
