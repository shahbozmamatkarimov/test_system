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
import { TestResultService } from './test-result.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';

@ApiTags('test-results')
@Controller('test-result')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @ApiOperation({ summary: 'create a new test result' })
  @UseGuards(StaffAdminGuard)
  @Post()
  create(@Body() createTestResultDto: CreateTestResultDto) {
    return this.testResultService.create(createTestResultDto);
  }

  @ApiOperation({ summary: 'get all test results' })
  @Get()
  findAll() {
    return this.testResultService.findAll();
  }

  @ApiOperation({ summary: 'get test result by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testResultService.findOne(id);
  }

  @ApiOperation({ summary: 'update test result by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTestResultDto: UpdateTestResultDto,
  ) {
    return this.testResultService.update(id, updateTestResultDto);
  }

  @ApiOperation({ summary: 'delete test result by id' })
  @UseGuards(StaffAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testResultService.remove(id);
  }
}
