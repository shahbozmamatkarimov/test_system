import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSubjectDto {
  @ApiProperty({
    type: 'string',
    example: '1234j-asdf98-adskfja',
    description: 'id of staff',
  })
  @IsNotEmpty()
  @IsString()
  staff_id: string;

  @ApiProperty({
    type: 'string',
    example: 'mathematics',
    description: 'title of subject',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
