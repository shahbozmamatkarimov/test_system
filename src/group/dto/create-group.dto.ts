import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    type: 'string',
    example: 'group IV',
    description: 'group name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'date',
    example: '16.02.2015',
    description: 'group start date',
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;
}
