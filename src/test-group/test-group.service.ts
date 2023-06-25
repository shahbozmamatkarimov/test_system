import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestGroup } from './models/test-group.model';

@Injectable()
export class TestGroupService {
  constructor(
    @InjectModel(TestGroup) private testGroupRepository: typeof TestGroup,
  ) {}

  async create(createTestGroupDto: CreateTestGroupDto): Promise<object> {
    try {
      const test_group = await this.testGroupRepository.create(
        createTestGroupDto,
      );
      return { message: 'Test group created succesfully', test_group };
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
        throw new BadRequestException('Test groups not found!');
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
        throw new BadRequestException('Test group not found!');
      }
      return test_group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateTestGroupDto: UpdateTestGroupDto,
  ): Promise<object> {
    try {
      const test_group = await this.testGroupRepository.update(
        updateTestGroupDto,
        { where: { id }, returning: true },
      );
      if (!test_group[1].length) {
        throw new BadRequestException('Test group not found!');
      }
      return {
        message: 'Test group updated succesfully',
        test_group: test_group[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const test_group = await this.testGroupRepository.findByPk(id);
      if (!test_group) {
        throw new BadRequestException('Test group not found!');
      }
      await this.testGroupRepository.destroy({ where: { id } });
      return { message: 'Test group deleted successfully', test_group };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
