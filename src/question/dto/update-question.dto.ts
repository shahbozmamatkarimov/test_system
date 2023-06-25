import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({
    type: 'string',
    example: 'How many data types are there in javascript?',
    description: 'question of test',
  })
  question?: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of test group',
  })
  test_group_id?: number;
}
