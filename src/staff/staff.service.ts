import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash, compare } from 'bcrypt';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './models/staff.model';
import { FilesService } from 'src/files/files.service';
import { LoginStaffDto } from './dto/login-staff.dto';
import { generateToken, writeToCookie } from 'src/utils/token';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/addRole.dto';
import { FullNameDto } from './dto/fullname.dto';
import { EmailDto } from './dto/email.dto';
import { SubjectService } from 'src/subject/subject.service';
import { GroupService } from 'src/group/group.service';
import { AddSubjectDto } from './dto/addSubject.dto';
import { AddGroupDto } from './dto/addGroup.dto';

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

  async create(createStaffDto: CreateStaffDto, image: any): Promise<object> {
    try {
      const is_exist_email = await this.staffRepository.findOne({
        where: { email: createStaffDto.email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Email already exists!');
      }
      const is_exist_login = await this.staffRepository.findOne({
        where: { login: createStaffDto.login },
      });
      if (is_exist_login) {
        throw new BadRequestException('Login already exists!');
      }
      const is_exist_phone = await this.staffRepository.findOne({
        where: { phone_number: createStaffDto.phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Phone number already exists!');
      }
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      let hashed_password: string;
      try {
        hashed_password = await hash(createStaffDto.password, 7);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const staff = await this.staffRepository.create({
        ...createStaffDto,
        hashed_password,
        image: image_name,
      });
      const role = await this.roleService.findByRole(createStaffDto.role);
      if (!role) {
        throw new BadRequestException('Role not found!');
      }
      await staff.$set('roles', [role.id]);
      await staff.save();
      staff.roles = [role];
      const subject = await this.subjectService.findByTitle(
        createStaffDto.subject,
      );
      if (!subject) {
        throw new BadRequestException('Subject not found!');
      }
      await staff.$set('subjects', [subject.id]);
      await staff.save();
      staff.subjects = [subject];
      const group = await this.groupService.findByName(createStaffDto.group);
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      await staff.$set('groups', [group.id]);
      await staff.save();
      staff.groups = [group];
      return { message: 'Staff created successfully', staff };
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
        throw new BadRequestException('Login not found!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, staff.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Wrong password!');
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
        acces_token: token.access_token,
        staff,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(refresh_token: string, res: Response): Promise<object> {
    try {
      let check: any;
      try {
        check = await this.jwtService.verify(refresh_token, {
          secret: process.env.REFRESH_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      res.clearCookie('refresh_token');
      return { message: 'Staff logged out successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addRole(addRoleDto: AddRoleDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findByPk(addRoleDto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const role = await this.roleService.findByRole(addRoleDto.name);
      if (!role) {
        throw new BadRequestException('Role not found!');
      }
      await staff.$add('roles', role.id);
      return { message: 'Role to staff added succesfully', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeRole(addRoleDto: AddRoleDto) {
    try {
      const staff = await this.staffRepository.findByPk(addRoleDto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const role = await this.roleService.findByRole(addRoleDto.name);
      if (!role) {
        throw new BadRequestException('Role not found!');
      }
      await staff.$remove('roles', role.id);
      return { message: 'Role from staff was removed', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addSubject(addSubjectDto: AddSubjectDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findByPk(addSubjectDto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const subject = await this.subjectService.findByTitle(
        addSubjectDto.title,
      );
      if (!subject) {
        throw new BadRequestException('Subject not found!');
      }
      await staff.$add('subjects', subject.id);
      return { message: 'Subject to staff added succesfully', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeSubject(addSubjectdto: AddSubjectDto) {
    try {
      const staff = await this.staffRepository.findByPk(addSubjectdto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const subject = await this.subjectService.findByTitle(
        addSubjectdto.title,
      );
      if (!subject) {
        throw new BadRequestException('Subject not found!');
      }
      await staff.$remove('subjects', subject.id);
      return { message: 'Subject from staff was removed', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addGroup(addGroupDto: AddGroupDto): Promise<object> {
    try {
      const staff = await this.staffRepository.findByPk(addGroupDto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const group = await this.groupService.findByName(addGroupDto.name);
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      await staff.$add('groups', group.id);
      return { message: 'Group to staff added succesfully', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeGroup(addGroupDto: AddGroupDto) {
    try {
      const staff = await this.staffRepository.findByPk(addGroupDto.staff_id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      const group = await this.groupService.findByName(addGroupDto.name);
      if (!group) {
        throw new BadRequestException('Group not found!');
      }
      await staff.$remove('groups', group.id);
      return { message: 'Group from staff was removed', staff };
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
        throw new BadRequestException('Staffs not found!');
      }
      return staffs;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByName(full_name: FullNameDto): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { full_name: full_name.full_name },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: EmailDto): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        where: { email: email.email },
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findByPk(id, {
        include: { all: true },
      });
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      return staff;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateStaffDto: UpdateStaffDto,
    image?: any,
  ): Promise<object> {
    try {
      if (image) {
        let image_name: string;
        try {
          image_name = await this.fileService.createFile(image);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
        const staff = await this.staffRepository.update(
          { ...updateStaffDto, image: image_name },
          { where: { id }, returning: true },
        );
        if (!staff[1].length) {
          throw new BadRequestException('Staff not found!');
        }
        return { message: 'Staff updated succesfully', staff: staff[1][0] };
      }
      const staff = await this.staffRepository.update(updateStaffDto, {
        where: { id },
        returning: true,
      });
      if (!staff[1].length) {
        throw new BadRequestException('Staff not found!');
      }
      return { message: 'Staff updated succesfully', staff: staff[1][0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const staff = await this.staffRepository.findByPk(id);
      if (!staff) {
        throw new BadRequestException('Staff not found!');
      }
      await this.staffRepository.destroy({ where: { id } });
      return { message: 'Staff deleted successfully', staff };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
