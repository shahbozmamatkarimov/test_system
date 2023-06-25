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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';

@ApiTags('answers')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ summary: 'Create a new answer' })
  @UseGuards(StaffAdminGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @ApiOperation({ summary: 'get all answers' })
  @UseGuards(StaffAdminGuard)
  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @ApiOperation({ summary: 'get answer by id' })
  @UseGuards(StaffAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @ApiOperation({ summary: 'update answer by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @ApiOperation({ summary: 'delete answer by id' })
  @UseGuards(StaffAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }
}
