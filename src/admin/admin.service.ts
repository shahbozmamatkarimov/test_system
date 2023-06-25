import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { generateToken, writeToCookie } from 'src/utils/token';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<object> {
    try {
      const check = await this.adminRepository.findOne({
        where: { email: createAdminDto.email },
      });
      if (check) {
        throw new BadRequestException('You are already listed as an admin!');
      }
      let hashed_password: string;
      try {
        hashed_password = await hash(createAdminDto.password, 7);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      await this.adminRepository.create({
        ...createAdminDto,
        hashed_password,
      });
      return { message: 'Admin created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginAdminDto: LoginAdminDto, res: Response): Promise<object> {
    try {
      const { email, password } = loginAdminDto;
      const admin = await this.adminRepository.findOne({
        where: { email },
      });
      if (!admin) {
        throw new BadRequestException('Email not found!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, admin.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Wrong password!');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const jwt_payload = {
        id: admin.id,
        username: admin.username,
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
      return { access_token: token.access_token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(refresh_token: string, res: Response): Promise<object> {
    try {
      let admin: any;
      try {
        admin = await this.jwtService.verify(refresh_token, {
          secret: process.env.REFRESH_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      res.clearCookie('refresh_token');
      return { message: 'Admin logged out successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      const admins = await this.adminRepository.findAll();
      if (!admins.length) {
        throw new BadRequestException('Amin list is empty!');
      }
      return admins;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new BadRequestException('Admin not found!');
      }
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<object> {
    try {
      if (updateAdminDto.password) {
        let hashed_password: string;
        try {
          hashed_password = await hash(updateAdminDto.password, 7);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
        await this.adminRepository.update(
          { ...updateAdminDto, hashed_password },
          { where: { id }, returning: true },
        );
        return { message: "Admin's information has been updated" };
      }
      const admin = await this.adminRepository.update(updateAdminDto, {
        where: { id },
        returning: true,
      });
      return { message: "Admin's information has been updated" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new BadRequestException('Admin not found!');
      }
      await this.adminRepository.destroy({ where: { id } });
      return { message: 'Admin has been removed' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
