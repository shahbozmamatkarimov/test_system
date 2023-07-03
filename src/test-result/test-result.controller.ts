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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestResultDto } from './dto/test-result.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('test-results')
@Controller('test-result')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @ApiOperation({ summary: 'create a new test result' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() testResultDto: TestResultDto) {
    return this.testResultService.create(testResultDto);
  }

  @ApiOperation({ summary: 'get all test results' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.testResultService.findAll();
  }

  @ApiOperation({ summary: 'get test result by id' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.testResultService.findOne(id);
  }

  @ApiOperation({ summary: 'update test result by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() testResultDto: TestResultDto) {
    return this.testResultService.update(id, testResultDto);
  }

  @ApiOperation({ summary: 'delete test result by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testResultService.remove(id);
  }
}
