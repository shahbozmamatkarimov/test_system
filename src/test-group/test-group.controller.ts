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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestGroupDto } from './dto/test-group.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('test-groups')
@Controller('test-group')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @ApiOperation({ summary: 'create a new test group' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() testGroupDto: TestGroupDto) {
    return this.testGroupService.create(testGroupDto);
  }

  @ApiOperation({ summary: 'get all test groups' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.testGroupService.findAll();
  }

  @ApiOperation({ summary: 'get test group by id' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.testGroupService.findOne(id);
  }

  @ApiOperation({ summary: 'update test group by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() testGroupDto: TestGroupDto) {
    return this.testGroupService.update(id, testGroupDto);
  }

  @ApiOperation({ summary: 'delete test group by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testGroupService.remove(id);
  }
}
