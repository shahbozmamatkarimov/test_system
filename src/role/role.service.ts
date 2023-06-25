import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto): Promise<object> {
    try {
      const exist_role = await this.roleRepository.findOne({
        where: { name: createRoleDto.name },
      });
      if (exist_role) {
        throw new BadRequestException('Role already exists!');
      }
      const role = await this.roleRepository.create(createRoleDto);
      return { message: 'Role created successfully', role };
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
        throw new BadRequestException('Roles not found!');
      }
      return roles;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByRole(name: string): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: { name },
        include: { all: true },
      });
      if (!role) {
        throw new BadRequestException('Role not found!');
      }
      return role;
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
        throw new BadRequestException('Role not found!');
      }
      return role;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<object> {
    try {
      const role = await this.roleRepository.update(updateRoleDto, {
        where: { id },
        returning: true,
      });
      if (!role[1].length) {
        throw new BadRequestException('Role not found!');
      }
      return { message: 'Role updated succesfully', role: role[1][0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const role = await this.roleRepository.findByPk(id);
      if (!role) {
        throw new BadRequestException('Role not found!');
      }
      await this.roleRepository.destroy({ where: { id } });
      return { message: 'Role deleted successfully', role };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
