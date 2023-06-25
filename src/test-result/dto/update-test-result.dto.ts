import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestResultDto {
  @ApiProperty({
    type: 'number',
    example: '26',
    description: 'count of correct answers',
  })
  correct_count?: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'student id',
  })
  student_id?: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'test group id',
  })
  test_group_id?: number;
}
