import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerDto {
  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  @IsNotEmpty()
  @IsString()
  a: string;

  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  @IsNotEmpty()
  @IsString()
  b: string;

  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  @IsNotEmpty()
  @IsString()
  c: string;

  @ApiProperty({
    type: 'string',
    example: 'Javascript has 7 data types',
    description: 'answer to question',
  })
  @IsNotEmpty()
  @IsString()
  d: string;

  @ApiProperty({
    type: 'string',
    example: 'a',
    description: 'true answer to question',
  })
  @IsNotEmpty()
  @IsBoolean()
  true_answer: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'question id',
  })
  @IsNotEmpty()
  @IsNumber()
  question_id: number;
}
