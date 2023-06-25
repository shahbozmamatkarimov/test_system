import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffDto {
  @ApiProperty({
    type: 'string',
    example: 'Adam',
    description: 'new first name of staff',
  })
  full_name?: string;

  @ApiProperty({
    type: 'string',
    example: '+998990090807',
    description: 'new phone number of staff',
  })
  phone_number?: string;

  @ApiProperty({
    type: 'string',
    example: 'adamsmith@gmail.com',
    description: 'new email address of staff',
  })
  email?: string;

  @ApiProperty({
    type: 'string',
    example: 'SmithAdam',
    description: 'new login of staff',
  })
  login?: string;

  @ApiProperty({
    type: 'string',
    example: 'AdamSmith2!',
    description: 'new password of staff',
  })
  password?: string;

  @ApiProperty({
    type: 'string',
    example: 'adamsmithdev',
    description: 'new telegram username of staff',
  })
  telegram_username?: string;
}
