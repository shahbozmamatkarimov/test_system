import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty({
    type: 'boolean',
    example: 'true',
    description: 'answer is true or false',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_true: boolean;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'question id',
  })
  @IsNotEmpty()
  @IsNumber()
  question_id: number;
}
