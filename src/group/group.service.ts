import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async create(groupDto: GroupDto): Promise<object> {
    try {
      const exist_group = await this.groupRepository.findOne({
        where: { name: groupDto.name },
      });
      if (exist_group) {
        throw new BadRequestException('Bunday nomli guruh mavjud!');
      }
      await this.groupRepository.create(groupDto);
      return { message: "Guruh ro'yxatga qo'shildi" };
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
        throw new BadRequestException("Guruhlar ro'yxati bo'sh!");
      }
      return groups;
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
        throw new BadRequestException('Guruh topilmadi!');
      }
      return group;
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
        throw new BadRequestException('Guruh topilmadi!');
      }
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByStartDate(start_date: Date): Promise<Group> {
    try {
      const group = await this.groupRepository.findOne({
        where: { start_date },
        include: { all: true },
      });
      if (!group) {
        throw new BadRequestException('Guruh topilmadi!');
      }
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, groupDto: GroupDto): Promise<object> {
    try {
      const group = await this.groupRepository.findByPk(id);
      if (!group) {
        throw new BadRequestException('Guruh topilmadi!');
      }
      const exist_group = await this.groupRepository.findOne({
        where: { name: groupDto.name },
      });
      if (exist_group) {
        throw new BadRequestException('Bunday nomli guruh mavjud!');
      }
      await this.groupRepository.update(groupDto, {
        where: { id },
        returning: true,
      });
      return { message: "Guruh ma'lumotlari o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const group = await this.groupRepository.findByPk(id);
      if (!group) {
        throw new BadRequestException('Guruh topilmadi!');
      }
      await this.groupRepository.destroy({ where: { id } });
      return { message: "Guruh ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
