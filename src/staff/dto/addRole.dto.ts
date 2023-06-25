import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    type: 'number',
    example: '2',
    description: 'id of staff',
  })
  @IsNotEmpty()
  @IsNumber()
  staff_id: number;

  @ApiProperty({
    type: 'string',
    example: 'HR',
    description: 'name of role',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
