import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({
    type: 'string',
    example: 'adam@gmail.com',
    description: "student's email address",
  })
  email: string;
}
