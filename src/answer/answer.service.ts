import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './models/answer.model';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<object> {
    try {
      const answer = await this.answerRepository.create(createAnswerDto);
      return { message: 'Answer created successfully', answer };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Answer[]> {
    try {
      const answers = await this.answerRepository.findAll({
        include: { all: true },
      });
      if (!answers.length) {
        throw new BadRequestException('Answers not found!');
      }
      return answers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOne({ where: { id } });
      if (!answer) {
        throw new BadRequestException('Answer not found!');
      }
      return answer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<object> {
    try {
      const answer = await this.answerRepository.update(updateAnswerDto, {
        where: { id },
        returning: true,
      });
      if (!answer[1].length) {
        throw new BadRequestException('Answer not found!');
      }
      return { message: 'Answer updated successfully', answer: answer[1][0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const answer = await this.answerRepository.findByPk(id);
      if (!answer) {
        throw new BadRequestException('Answer not found!');
      }
      await this.answerRepository.destroy({ where: { id } });
      return { message: 'Answer deleted successfully', answer };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
