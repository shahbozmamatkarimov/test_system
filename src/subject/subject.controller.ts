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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { SubjectDto } from './dto/subject.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('subjects')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'create a new subject' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() subjectDto: SubjectDto) {
    return this.subjectService.create(subjectDto);
  }

  @ApiOperation({ summary: 'get all subjects' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'get subject by id' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.subjectService.findById(id);
  }

  @ApiOperation({ summary: 'get subject by title' })
  @Get('title')
  @UseGuards(AuthGuard)
  findByTitle(@Body() title: string) {
    return this.subjectService.findByTitle(title);
  }

  @ApiOperation({ summary: 'update subject by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() subjectDto: SubjectDto) {
    return this.subjectService.update(id, subjectDto);
  }

  @ApiOperation({ summary: 'delete subject by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subjectService.remove(id);
  }
}
