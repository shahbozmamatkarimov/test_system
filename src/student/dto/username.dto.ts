import { ApiProperty } from '@nestjs/swagger';

export class UsernameDto {
  @ApiProperty({
    type: 'string',
    example: 'adamsmith',
    description: "student's username",
  })
  username: string;
}
