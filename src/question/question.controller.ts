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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentSelfGuard } from 'src/guards/student-self.guard';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';

@ApiTags('questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'create a new question' })
  @UseGuards(StudentSelfGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiOperation({ summary: 'get all questions' })
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @ApiOperation({ summary: 'get question by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(id);
  }

  @ApiOperation({ summary: 'update question by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @ApiOperation({ summary: 'delete question by id' })
  @UseGuards(StaffAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }
}
