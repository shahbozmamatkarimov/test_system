import { ApiProperty } from '@nestjs/swagger';

export class FullNameDto {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'full name of staff',
  })
  full_name: string;
}
