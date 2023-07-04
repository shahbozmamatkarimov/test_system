import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash, compare } from 'bcrypt';
import { Staff } from './models/staff.model';
import { FilesService } from 'src/files/files.service';
import { LoginStaffDto } from './dto/login-staff.dto';
import { generateToken, writeToCookie } from 'src/utils/token';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/addRole.dto';
import { SubjectService } from 'src/subject/subject.service';
import { GroupService } from 'src/group/group.service';
import { AddSubjectDto } from './dto/addSubject.dto';
import { AddGroupDto } from './dto/addGroup.dto';
import { v4 } from 'uuid';
import { StaffDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff) private staffRepository: typeof Staff,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService,
    private readonly roleService: RoleService,
    private readonly subjectService: SubjectService,
    private readonly groupService: GroupService,
  ) {}

  async create(staffDto: StaffDto, image: any): Promise<object> {
    try {
      const { login, email, password, phone_number, telegram_username } =
        staffDto;
      const is_exist_login = await this.staffRepository.findOne({
        where: { login },
      });
      if (is_exist_login) {
        throw new BadRequestException('Bunday login mavjud!');
      }
      const is_exist_email = await this.staffRepository.findOne({
        where: { email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Bunday email mavjud!');
      }
      const is_exist_phone = await this.staffRepository.findOne({
        where: { phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Bunday telefon raqam mavjud!');
      }
      const is_exist_telegram = await this.staffRepository.findOne({
        where: { telegram_username },
      });
      if (is_exist_telegram) {
        throw new BadRequestException('Bunday telegram username mavjud!');
      }
      const id: string = v4();
      let hashed_password: string;
      try {
        hashed_password = await hash(password, 7);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (image) {
        let image_name: string;
        try {
          image_name = await this.fileService.createFile(image);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
        const staff = await this.staffRepository.create({
          id,
          hashed_password,
          image: image_name,
          ...staffDto,
        });
        if (staffDto.role) {
          const roles = await this.roleService.findAll();
          if (!roles.length) {
            await this.roleService.create({
              name: 'admin',
              description: 'first admin',
            });
          }
          staffDto.role = staffDto.role.toLowerCase();
          const role = await this.roleService.findByRole(staffDto.role);
          if (!role) {
            throw new BadRequestException('Role topilmadi!');
          }
          await staff.$set('roles', [role.id]);
          await staff.save();
          staff.roles = [role];
        }
        if (staffDto.subject) {
          const subject = await this.subjectService.findByTitle(staffDto.subject);
          if (!subject) {
            throw new BadRequestException('Fan topilmadi!');
          }
          await staff.$set('subjects', [subject.id]);
          await staff.save();
          staff.subjects = [subject];
        }
        if (staffDto.group) {
          const group = await this.groupService.findByName(staffDto.group);
          if (!group) {
            throw new BadRequestException('Guruh topilmadi!');
          }
          await staff.$set('groups', [group.id]);
          await staff.save();
          staff.groups = [group];
        }
        return { message: "Xodim ro'yxatga qo'shildi" };
      }
      const staff = await this.staffRepository.create({
        id,
        hashed_password,
        ...staffDto,
      });
      if (staffDto.role) {
        const roles = await this.roleService.findAll();
        if (!roles.length) {
          await this.roleService.create({
            name: 'admin',
            description: 'first admin',
          });
        }
        staffDto.role = staffDto.role.toLowerCase();
        const role = await this.roleService.findByRole(staffDto.role);
        if (!role) {
          throw new BadRequestException('Role topilmadi!');
        }
        await staff.$set('roles', [role.id]);
        await staff.save();
        staff.roles = [role];
      }
      if (staffDto.subject) {
        const subject = await this.subjectService.findByTitle(staffDto.subject);
        if (!subject) {
          throw new BadRequestException('Fan topilmadi!');
        }
        await staff.$set('subjects', [subject.id]);
        await staff.save();
        staff.subjects = [subject];
      }
      if (staffDto.group) {
        const group = await this.groupService.findByName(staffDto.group);
        if (!group) {
          throw new BadRequestException('Guruh topilmadi!');
        }
        await staff.$set('groups', [group.id]);
        await staff.save();
        staff.groups = [group];
      }
      return { message: "Xodim ro'yxatga qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginStaffDto, res: Response): Promise<object> {
    const { login, password } = loginDto;
    try {
      const staff = await this.staffRepository.findOne({
        where: { login },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Login mos kelmadi!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, staff.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Parol mos kelmadi!');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const jwt_payload = {
        id: staff.id,
        role: staff.roles,
      };
      let token: any;
      try {
        token = await generateToken(jwt_payload, this.jwtService);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      try {
        await writeToCookie(token.refresh_token, res);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return {
        message: 'Xodim tizimga kirdi',
        id: staff.id,
        role: staff.roles,
        acces_token: token.access_token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(refresh_token: string, res: Response): Promise<object> {
    try {
      try {
        await this.jwtService.verify(refresh_token, {
          secret: process.env.REFRESH_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      res.clearCookie('refresh_token');
      return { message: 'Xodim tizimdan chiqdi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addRole(addRoleDto: AddRoleDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addRoleDto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      addRoleDto.name = addRoleDto.name.toLowerCase();
      const role = await this.roleService.findByRole(addRoleDto.name);
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      await staff.$add('roles', role.id);
      return { message: "Xodimga lavozim qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeRole(addRoleDto: AddRoleDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addRoleDto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      addRoleDto.name = addRoleDto.name.toLowerCase();
      const role = await this.roleService.findByRole(addRoleDto.name);
      if (!role) {
        throw new BadRequestException('Lavozim topilmadi!');
      }
      await staff.$remove('roles', role.id);
      return { message: 'Xodimdan lavozim olib tashlandi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addSubject(addSubjectDto: AddSubjectDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addSubjectDto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      const subject = await this.subjectService.findByTitle(
        addSubjectDto.title,
      );
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      await staff.$add('subjects', subject.id);
      return { message: 'Xodimga fan biriktirildi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeSubject(addSubjectdto: AddSubjectDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addSubjectdto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      const subject = await this.subjectService.findByTitle(
        addSubjectdto.title,
      );
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      await staff.$remove('subjects', subject.id);
      return { message: 'Xodimdan fan olib tashlandi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addGroup(addGroupDto: AddGroupDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addGroupDto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      const group = await this.groupService.findByName(addGroupDto.name);
      if (!group) {
        throw new BadRequestException('Guruh topilmadi!');
      }
      await staff.$add('groups', group.id);
      return { message: 'Xodim guruhga biriktirildi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeGroup(addGroupDto: AddGroupDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id: addGroupDto.staff_id },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      const group = await this.groupService.findByName(addGroupDto.name);
      if (!group) {
        throw new BadRequestException('Guruh topilmadi!');
      }
      await staff.$remove('groups', group.id);
      return { message: 'Xodimdan guruh olib tashlandi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Staff[]> {
    try {
      const staffs = await this.staffRepository.findAll({
        include: { all: true },
      });
      if (!staffs.length) {
        throw new BadRequestException("Xodimlar ro'yxati bo'sh!");
      }
      return staffs;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByLogin(login: string): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { login },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByName(full_name: string): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { full_name },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { email },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, staffDto: StaffDto, image?: any): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({ where: { id } });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      const { login, email, phone_number, telegram_username } = staffDto;
      const is_exist_login = await this.staffRepository.findOne({
        where: { login },
      });
      if (is_exist_login) {
        throw new BadRequestException('Bunday login mavjud!');
      }
      const is_exist_email = await this.staffRepository.findOne({
        where: { email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Bunday email mavjud!');
      }
      const is_exist_phone = await this.staffRepository.findOne({
        where: { phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Bunday telefon raqam mavjud!');
      }
      const is_exist_telegram = await this.staffRepository.findOne({
        where: { telegram_username },
      });
      if (is_exist_telegram) {
        throw new BadRequestException('Bunday telegram username mavjud!');
      }
      if (image) {
        let image_name: string;
        try {
          image_name = await this.fileService.createFile(image);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
        await this.staffRepository.update(
          { ...staffDto, image: image_name },
          { where: { id }, returning: true },
        );
        if (staffDto.role) {
          const roles = await this.roleService.findAll();
          if (!roles.length) {
            await this.roleService.create({
              name: 'admin',
              description: 'first admin',
            });
          }
          staffDto.role = staffDto.role.toLowerCase();
          const role = await this.roleService.findByRole(staffDto.role);
          if (!role) {
            throw new BadRequestException('Role topilmadi!');
          }
          await staff.$set('roles', [role.id]);
          await staff.save();
          staff.roles = [role];
        }
        if (staffDto.subject) {
          const subject = await this.subjectService.findByTitle(staffDto.subject);
          if (!subject) {
            throw new BadRequestException('Fan topilmadi!');
          }
          await staff.$set('subjects', [subject.id]);
          await staff.save();
          staff.subjects = [subject];
        }
        if (staffDto.group) {
          const group = await this.groupService.findByName(staffDto.group);
          if (!group) {
            throw new BadRequestException('Guruh topilmadi!');
          }
          await staff.$set('groups', [group.id]);
          await staff.save();
          staff.groups = [group];
        }
        return { message: "Xodim ma'lumotlari o'zgartirildi" };
      }
      await this.staffRepository.update(staffDto, {
        where: { id },
        returning: true,
      });
      if (staffDto.role) {
        const roles = await this.roleService.findAll();
        if (!roles.length) {
          await this.roleService.create({
            name: 'admin',
            description: 'first admin',
          });
        }
        staffDto.role = staffDto.role.toLowerCase();
        const role = await this.roleService.findByRole(staffDto.role);
        if (!role) {
          throw new BadRequestException('Role topilmadi!');
        }
        await staff.$set('roles', [role.id]);
        await staff.save();
        staff.roles = [role];
      }
      if (staffDto.subject) {
        const subject = await this.subjectService.findByTitle(staffDto.subject);
        if (!subject) {
          throw new BadRequestException('Fan topilmadi!');
        }
        await staff.$set('subjects', [subject.id]);
        await staff.save();
        staff.subjects = [subject];
      }
      if (staffDto.group) {
        const group = await this.groupService.findByName(staffDto.group);
        if (!group) {
          throw new BadRequestException('Guruh topilmadi!');
        }
        await staff.$set('groups', [group.id]);
        await staff.save();
        staff.groups = [group];
      }
      return { message: "Xodim ma'lumotlari o'zgartirild" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const staff = await this.staffRepository.findOne({ where: { id } });
      if (!staff) {
        throw new BadRequestException('Xodim topilmadi!');
      }
      await this.staffRepository.destroy({ where: { id } });
      return { message: "Xodim ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
