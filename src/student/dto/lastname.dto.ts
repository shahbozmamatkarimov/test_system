import { ApiProperty } from '@nestjs/swagger';

export class LastNameDto {
  @ApiProperty({
    type: 'string',
    example: 'Smith',
    description: "student's last name",
  })
  last_name: string;
}
