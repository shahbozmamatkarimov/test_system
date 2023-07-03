import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TestGroup } from './models/test-group.model';
import { TestGroupDto } from './dto/test-group.dto';

@Injectable()
export class TestGroupService {
  constructor(
    @InjectModel(TestGroup) private testGroupRepository: typeof TestGroup,
  ) {}

  async create(testGroupDto: TestGroupDto): Promise<object> {
    try {
      await this.testGroupRepository.create(testGroupDto);
      return { message: "Test ro'yxatga qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<TestGroup[]> {
    try {
      const test_groups = await this.testGroupRepository.findAll({
        include: { all: true },
      });
      if (!test_groups.length) {
        throw new BadRequestException("Testlar ro'yxati bo'sh!");
      }
      return test_groups;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<TestGroup> {
    try {
      const test_group = await this.testGroupRepository.findByPk(id, {
        include: { all: true },
      });
      if (!test_group) {
        throw new BadRequestException('Test topilmadi!');
      }
      return test_group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, testGroupDto: TestGroupDto): Promise<object> {
    try {
      const test_group = this.testGroupRepository.findByPk(id);
      if (!test_group) {
        throw new BadRequestException('Test topilmadi!');
      }
      await this.testGroupRepository.update(testGroupDto, {
        where: { id },
        returning: true,
      });
      return { message: "Test o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const test_group = await this.testGroupRepository.findByPk(id);
      if (!test_group) {
        throw new BadRequestException('Test topilmadi!');
      }
      await this.testGroupRepository.destroy({ where: { id } });
      return { message: "Test ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
