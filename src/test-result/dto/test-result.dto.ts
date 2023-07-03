import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TestResultDto {
  @ApiProperty({
    type: 'string',
    example: '1afjkj2lj-asdfj2jk',
    description: 'student id',
  })
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'test group id',
  })
  @IsNotEmpty()
  @IsNumber()
  test_group_id: number;

  @ApiProperty({
    type: 'number',
    example: "['a', 'b', 'c', ...]",
    description: 'students answers',
  })
  @IsNotEmpty()
  @IsString()
  test_result: string;

  @ApiProperty({
    type: 'number',
    example: '26',
    description: 'count of correct answers',
  })
  @IsNotEmpty()
  @IsNumber()
  correct_count: number;
}
