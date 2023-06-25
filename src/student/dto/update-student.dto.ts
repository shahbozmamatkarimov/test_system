import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty({
    type: 'string',
    example: 'Adam',
    description: "student's first name",
  })
  first_name?: string;

  @ApiProperty({
    type: 'string',
    example: 'Smith',
    description: "student's last name",
  })
  last_name?: string;

  @ApiProperty({
    type: 'string',
    example: '+998991112233',
    description: "student's phone number",
  })
  phone_number?: string;

  @ApiProperty({
    type: 'string',
    example: 'adam@gmail.com',
    description: "student's email address",
  })
  email?: string;

  @ApiProperty({
    type: 'string',
    example: 'adamsmith',
    description: "student's username",
  })
  username?: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith0!',
    description: "student's password",
  })
  password?: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: "student's group id",
  })
  group_id?: number;
}
