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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('subjects')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'create a new subject' })
  @UseGuards(StaffAdminGuard)
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'get all subjects' })
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'get subject by title' })
  @Get('title')
  findByTitle(@Body() title: string) {
    return this.subjectService.findByTitle(title);
  }

  @ApiOperation({ summary: 'get subject by id' })
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.subjectService.findById(id);
  }

  @ApiOperation({ summary: 'update subject by id' })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: 'delete subject by id' })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subjectService.remove(id);
  }
}
