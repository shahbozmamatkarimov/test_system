import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestResultDto {
  @ApiProperty({
    type: 'number',
    example: '26',
    description: 'count of correct answers',
  })
  @IsNotEmpty()
  @IsNumber()
  correct_count: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'student id',
  })
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'test group id',
  })
  @IsNotEmpty()
  @IsNumber()
  test_group_id: number;
}
