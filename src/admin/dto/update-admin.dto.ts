import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDto {
    @ApiProperty({
        type: 'string',
        example: 'admin1',
        description: "admin's username",
      })
      username?: string;
    
      @ApiProperty({
        type: 'string',
        example: 'admin@gmail.com',
        description: "admin's email address",
      })
      email?: string;
    
      @ApiProperty({
        type: 'string',
        example: 'Admin001!',
        description: "admin's password",
      })
      password?: string;
    
      @ApiProperty({
        type: 'string',
        example: '+998901234567',
        description: "admin's phone number",
      })
      phone?: string;
}
