import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  async create(questionDto: QuestionDto): Promise<object> {
    try {
      await this.questionRepository.create(questionDto);
      return { messag: "Savol ro'yxatga qo'shildi" };
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
        throw new BadRequestException("Savollar ro'yxati bo'sh!");
      }
      return questions;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findByPk(id);
      if (!question) {
        throw new BadRequestException('Savol topilmadi!');
      }
      return question;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, questionDto: QuestionDto): Promise<object> {
    try {
      const question = await this.questionRepository.findByPk(id);
      if (!question) {
        throw new BadRequestException('Savol topilmadi!');
      }
      await this.questionRepository.update(questionDto, {
        where: { id },
        returning: true,
      });
      return { message: "Savol o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const question = await this.questionRepository.findByPk(id);
      if (!question) {
        throw new BadRequestException('Savol topilmadi!');
      }
      await this.questionRepository.destroy({ where: { id } });
      return { message: "Savol ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
