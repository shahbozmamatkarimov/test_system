import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginStaffDto {
  @ApiProperty({
    type: 'string',
    example: 'JohnDoe',
    description: 'login of the staff',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'JohnDoe1!',
    description: 'password of the staff',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
