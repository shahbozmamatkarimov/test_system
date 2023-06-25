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
import { TestGroupService } from './test-group.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';

@ApiTags('test-groups')
@Controller('test-group')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @ApiOperation({ summary: 'create a new test group' })
  @UseGuards(StaffAdminGuard)
  @Post()
  create(@Body() createTestGroupDto: CreateTestGroupDto) {
    return this.testGroupService.create(createTestGroupDto);
  }

  @ApiOperation({ summary: 'get all test groups' })
  @Get()
  findAll() {
    return this.testGroupService.findAll();
  }

  @ApiOperation({ summary: 'get test group by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testGroupService.findOne(id);
  }

  @ApiOperation({ summary: 'update test group by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTestGroupDto: UpdateTestGroupDto,
  ) {
    return this.testGroupService.update(id, updateTestGroupDto);
  }

  @ApiOperation({ summary: 'delete test group by id' })
  @UseGuards(StaffAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testGroupService.remove(id);
  }
}
