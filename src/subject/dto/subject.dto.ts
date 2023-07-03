import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubjectDto {
  @ApiProperty({
    type: 'string',
    example: 'mathematics',
    description: 'subject title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
