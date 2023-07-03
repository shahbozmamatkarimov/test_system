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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswerDto } from './dto/answer.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('answers')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ summary: 'Create a new answer' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  create(@Body() answerDto: AnswerDto) {
    return this.answerService.create(answerDto);
  }

  @ApiOperation({ summary: 'get all answers' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.answerService.findAll();
  }

  @ApiOperation({ summary: 'get answer by id' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @ApiOperation({ summary: 'update answer by id' })
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() answerDto: AnswerDto) {
    return this.answerService.update(id, answerDto);
  }

  @ApiOperation({ summary: 'delete answer by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }
}
