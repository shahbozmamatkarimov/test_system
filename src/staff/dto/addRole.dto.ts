import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    type: 'string',
    example: '1234j-asdf98-adskfja',
    description: 'id of staff',
  })
  @IsNotEmpty()
  @IsString()
  staff_id: string;

  @ApiProperty({
    type: 'string',
    example: 'teacher',
    description: 'name of role',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
