import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(roleDto: RoleDto): Promise<object> {
    try {
      const exist_role = await this.roleRepository.findOne({
        where: { name: roleDto.name },
      });
      if (exist_role) {
        throw new BadRequestException('Bunday nomli lavozim mavjud!');
      }
      roleDto.name = roleDto.name.toLowerCase();
      await this.roleRepository.create(roleDto);
      return { message: "Lavozim ro'yxatga qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      const roles = await this.roleRepository.findAll({
        include: { all: true },
      });
      if (!roles.length) {
        throw new BadRequestException("Lavozimlar ro'yxati bo'sh!");
      }
      return roles;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findByPk(id, {
        include: { all: true },
      });
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      return role;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByRole(name: string): Promise<Role> {
    try {
      const roles = await this.roleRepository.findAll();
      if (!roles.length) {
        await this.roleRepository.create({
          name: 'admin',
          description: 'first admin',
        });
      }
      const role = await this.roleRepository.findOne({
        where: { name },
        include: { all: true },
      });
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      return role;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, roleDto: RoleDto): Promise<object> {
    try {
      const exist_role = await this.roleRepository.findOne({
        where: { name: roleDto.name },
      });
      if (exist_role) {
        throw new BadRequestException('Bunday nomli lavozim mavjud!');
      }
      const role = await this.roleRepository.findByPk(id);
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      await this.roleRepository.update(roleDto, {
        where: { id },
        returning: true,
      });
      return { message: "Lavozim o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const role = await this.roleRepository.findByPk(id);
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      await this.roleRepository.destroy({ where: { id } });
      return { message: "Lavozim ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
