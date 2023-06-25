import { ApiProperty } from '@nestjs/swagger';

export class FirstNameDto {
  @ApiProperty({
    type: 'string',
    example: 'Adam',
    description: "student's first name",
  })
  first_name: string;
}
