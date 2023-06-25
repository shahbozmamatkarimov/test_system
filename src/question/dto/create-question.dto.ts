import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    type: 'string',
    example: 'How many data types are there in javascript?',
    description: 'question of test',
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of test group',
  })
  @IsNotEmpty()
  @IsNumber()
  test_group_id: number;
}
