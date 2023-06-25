import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { TestGroup } from 'src/test-group/models/test-group.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(TestGroup) private testGroupRepository: typeof TestGroup,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<object> {
    try {
      const exist_question = await this.questionRepository.findOne({
        where: { question: createQuestionDto.question },
      });
      if (exist_question) {
        throw new BadRequestException('Question already exists!');
      }
      const question = await this.questionRepository.create(createQuestionDto);
      return { message: 'Question created succesfully', question };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Question[]> {
    try {
      const questions = await this.questionRepository.findAll({
        include: { all: true },
      });
      if (!questions.length) {
        throw new BadRequestException('Questions not found!');
      }
      return questions;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findOne({ where: { id } });
      if (!question) {
        throw new BadRequestException('Question not found!');
      }
      return question;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<object> {
    try {
      const question = await this.questionRepository.update(updateQuestionDto, {
        where: { id },
        returning: true,
      });
      if (!question[1].length) {
        throw new BadRequestException('Question not found!');
      }
      return {
        message: 'Question updated succesfully',
        question: question[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const question = await this.questionRepository.findByPk(id);
      if (!question) {
        throw new BadRequestException('Question not found!');
      }
      await this.questionRepository.destroy({ where: { id } });
      return { message: 'Question deleted successfully', question };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
