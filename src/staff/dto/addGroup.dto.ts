import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddGroupDto {
  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of staff',
  })
  @IsNotEmpty()
  @IsNumber()
  staff_id: number;

  @ApiProperty({
    type: 'string',
    example: 'group IV',
    description: 'name of group',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
