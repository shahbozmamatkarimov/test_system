import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestGroupDto {
  @ApiProperty({
    type: 'number',
    example: '50',
    description: 'count of test',
  })
  @IsNotEmpty()
  @IsNumber()
  test_count: number;

  @ApiProperty({
    type: 'string',
    example: '2 hours',
    description: 'time of test',
  })
  @IsNotEmpty()
  @IsString()
  test_time: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of subject',
  })
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}
