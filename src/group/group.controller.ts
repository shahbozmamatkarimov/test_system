import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupDateDto } from './dto/group-date.dto';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';

@ApiTags('groups')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'create a new group' })
  @UseGuards(StaffAdminGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'get all groups' })
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: 'get group by name' })
  @Get('name')
  findByName(@Body() name: string) {
    return this.groupService.findByName(name);
  }

  @ApiOperation({ summary: 'get group by start date' })
  @Get('startdate')
  findByStartDate(@Body() start_date: GroupDateDto) {
    return this.groupService.findByStartDate(start_date);
  }

  @ApiOperation({ summary: 'get group by id' })
  @UseGuards(StaffAdminGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.groupService.findById(id);
  }

  @ApiOperation({ summary: 'udpate group by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'delete group by id' })
  @UseGuards(StaffAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupService.remove(id);
  }
}
