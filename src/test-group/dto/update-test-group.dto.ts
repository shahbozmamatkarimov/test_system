import { ApiProperty } from '@nestjs/swagger';
export class UpdateTestGroupDto {
  @ApiProperty({
    type: 'number',
    example: '50',
    description: 'count of test',
  })
  test_count?: number;

  @ApiProperty({
    type: 'string',
    example: '2 hours',
    description: 'time of test',
  })
  test_time?: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of subject',
  })
  subject_id?: number;
}
