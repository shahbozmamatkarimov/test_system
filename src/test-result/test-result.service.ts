import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './models/test-result.model';
import { TestResultDto } from './dto/test-result.dto';
import { Student } from 'src/student/models/student.model';
import { TestGroup } from 'src/test-group/models/test-group.model';
import { Question } from 'src/question/models/question.model';
import { Answer } from 'src/answer/models/answer.model';
import { Subject } from 'src/subject/models/subject.model';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResult) private testResultRepository: typeof TestResult,
  ) {}

  async create(testResultDto: TestResultDto): Promise<object> {
    try {
      const exist_question = await this.testResultRepository.findOne({
        where: { question_id: testResultDto.question_id },
      });
      if (exist_question) {
        if (exist_question.student_id == testResultDto.student_id) {
          throw new BadRequestException('Bu savolga javob berilgan!');
        }
      }
      await this.testResultRepository.create(testResultDto);
      return { message: 'Javob yuborildi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<TestResult[]> {
    try {
      const test_results = await this.testResultRepository.findAll({
        include: [
          { model: Student },
          { model: TestGroup, include: [Question] },
          { model: Question, include: [Answer] },
        ],
      });
      if (!test_results.length) {
        throw new BadRequestException("Test natijalari ro'yxati bo'sh!");
      }
      return test_results;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<TestResult> {
    try {
      const test_result = await this.testResultRepository.findByPk(id, {
        include: [
          { model: Student },
          { model: TestGroup, include: [Question] },
          { model: Question, include: [Answer] },
        ],
      });
      if (!test_result) {
        throw new BadRequestException('Test natijasi topilmadi!');
      }
      return test_result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByStudentId(student_id: string): Promise<TestResult[]> {
    try {
      const test_results = await this.testResultRepository.findAll({
        where: { student_id },
        include: [
          { model: Student },
          { model: TestGroup, include: [Question, Subject] },
          { model: Question, include: [Answer] },
        ],
      });
      if (!test_results.length) {
        throw new BadRequestException(
          "Ushbu talabaga tegishli test natijalari yo'q!",
        );
      }
      return test_results;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, testResultDto: TestResultDto): Promise<object> {
    try {
      await this.testResultRepository.update(testResultDto, {
        where: { id },
        returning: true,
      });
      return { message: 'Test natijasi tahrirlandi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      await this.testResultRepository.destroy({ where: { id } });
      return { message: "Test natijasi ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(question_id: number): Promise<void> {
    try {
      await this.testResultRepository.destroy({ where: { question_id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
