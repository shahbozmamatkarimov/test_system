import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
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
}
