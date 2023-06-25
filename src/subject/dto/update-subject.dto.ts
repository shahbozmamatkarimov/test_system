import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty({
    type: 'string',
    example: 'geographic',
    description: 'new subject name',
  })
  title?: string;
}
