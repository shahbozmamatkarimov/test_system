import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  answer?: string;

  @ApiProperty({
    type: 'boolean',
    example: 'true',
    description: 'answer is true or false',
  })
  is_true?: boolean;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'question id',
  })
  question_id?: number;
}
