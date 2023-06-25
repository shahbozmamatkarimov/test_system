import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({
    type: 'string',
    example: 'john@example.com',
    description: 'email of staff',
  })
  email: string;
}
