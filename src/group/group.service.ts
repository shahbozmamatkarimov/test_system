import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { GroupDateDto } from './dto/group-date.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async create(createGroupDto: CreateGroupDto): Promise<object> {
    try {
      const exist_group = await this.groupRepository.findOne({
        where: { name: createGroupDto.name },
      });
      if (exist_group) {
        throw new BadRequestException('Group already exists!');
      }
      const group = await this.groupRepository.create(createGroupDto);
      return { message: 'Group created succesfully', group };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Group[]> {
    try {
      const groups = await this.groupRepository.findAll({
        include: { all: true },
      });
      if (!groups.length) {
        throw new BadRequestException('Groups not found!');
      }
      return groups;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByName(name: string): Promise<Group> {
    try {
      const group = await this.groupRepository.findOne({
        where: { name },
        include: { all: true },
      });
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByStartDate(startDate: GroupDateDto): Promise<Group> {
    try {
      const group = await this.groupRepository.findOne({
        where: { start_date: startDate.start_date },
        include: { all: true },
      });
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<Group> {
    try {
      const group = await this.groupRepository.findByPk(id, {
        include: { all: true },
      });
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<object> {
    try {
      const group = await this.groupRepository.update(updateGroupDto, {
        where: { id: id },
        returning: true,
      });
      if (!group[1].length) {
        throw new BadRequestException('Group not found!');
      }
      return { message: 'Updated group successfully', group: group[1][0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const group = await this.groupRepository.findByPk(id);
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      await this.groupRepository.destroy({ where: { id } });
      return { message: 'Group deleted successfully', group };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
