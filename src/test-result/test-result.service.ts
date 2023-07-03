import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './models/test-result.model';
import { TestResultDto } from './dto/test-result.dto';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResult) private testResultRepository: typeof TestResult,
  ) {}

  async create(testResultDto: TestResultDto): Promise<object> {
    try {
      await this.testResultRepository.create(testResultDto);
      return { message: "Test natijasi ro'yxatga qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<TestResult[]> {
    try {
      const test_results = await this.testResultRepository.findAll({
        include: { all: true },
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
        include: { all: true },
      });
      if (!test_result) {
        throw new BadRequestException('Test natijasi topilmadi!');
      }
      return test_result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, testResultDto: TestResultDto): Promise<object> {
    try {
      const test_result = await this.testResultRepository.findByPk(id);
      if (!test_result) {
        throw new BadRequestException('Test natijasi topilmadi!');
      }
      await this.testResultRepository.update(testResultDto, {
        where: { id },
        returning: true,
      });
      return { message: "Test natijasi ma'lumotlari o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const test_result = await this.testResultRepository.findByPk(id);
      if (!test_result) {
        throw new BadRequestException('Test natijasi topilmadi!');
      }
      await this.testResultRepository.destroy({ where: { id } });
      return { message: "Test natijasi ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
