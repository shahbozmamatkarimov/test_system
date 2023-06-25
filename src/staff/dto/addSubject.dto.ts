import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddSubjectDto {
  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'id of staff',
  })
  @IsNotEmpty()
  @IsNumber()
  staff_id: number;

  @ApiProperty({
    type: 'string',
    example: 'mathematics',
    description: 'title of subject',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
