import { ApiProperty } from "@nestjs/swagger";

export class UpdateGroupDto {
    @ApiProperty({
        type: 'string',
        example: 'group XI',
        description: 'new group name',
      })
      name?: string;
    
      @ApiProperty({
        type: 'date',
        example: '29.03.2022',
        description: 'new group start date',
      })
      start_date?: Date;
}
