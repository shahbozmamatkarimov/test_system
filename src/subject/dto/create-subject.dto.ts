import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    type: 'string',
    example: 'mathematics',
    description: 'subject name',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
