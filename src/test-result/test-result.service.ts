import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './models/test-result.model';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResult) private testResultRepository: typeof TestResult,
  ) {}

  async create(createTestResultDto: CreateTestResultDto): Promise<object> {
    try {
      const test_result = await this.testResultRepository.create(
        createTestResultDto,
      );
      return { message: 'Test result created successfully', test_result };
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
        throw new BadRequestException('Test results is empty!');
      }
      return test_results;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<TestResult> {
    try {
      const test_result = await this.testResultRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!test_result) {
        throw new BadRequestException('Test result not found!');
      }
      return test_result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateTestResultDto: UpdateTestResultDto,
  ): Promise<object> {
    try {
      const test_result = await this.testResultRepository.update(
        updateTestResultDto,
        { where: { id }, returning: true },
      );
      if (!test_result[1].length) {
        throw new BadRequestException('Test result not found!');
      }
      return {
        message: 'Test result updated successfully',
        test_result: test_result[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const test_result = await this.testResultRepository.findOne({
        where: { id },
      });
      if (!test_result) {
        throw new BadRequestException('Test result not found!');
      }
      await this.testResultRepository.destroy({ where: { id } });
      return { message: 'Test result deleted successfully', test_result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
