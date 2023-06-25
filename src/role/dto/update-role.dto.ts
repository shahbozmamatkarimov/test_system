import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    type: 'string',
    example: 'teacher',
    description: 'new role',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    example: 'this is a first teacher',
    description: 'new description of the new role',
  })
  description?: string;
}
