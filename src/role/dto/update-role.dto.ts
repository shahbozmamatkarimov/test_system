import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    type: 'string',
    example: 'teacher',
    description: 'new role',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'this is a first teacher',
    description: 'new description of the new role',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
