import { ApiProperty } from '@nestjs/swagger';

export class GroupDateDto {
  @ApiProperty({
    type: 'date',
    example: '14.12.2015',
    description: 'group start date',
  })
  start_date: Date;
}
