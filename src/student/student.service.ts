import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { FilesService } from 'src/files/files.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { Response } from 'express';
import { generateToken, writeToCookie } from 'src/utils/token';
import { LoginDto } from './dto/login.dto';
import { StudentDto } from './dto/student.dto';
import { v4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly fileService: FilesService,
    private readonly jwtService: JwtService,
  ) {}

  async create(studentDto: StudentDto, image: any): Promise<object> {
    try {
      const { login, email, phone_number, telegram_username } = studentDto;
      const is_exist_login = await this.studentRepository.findOne({
        where: { login },
      });
      if (is_exist_login) {
        throw new BadRequestException('Bunday login mavjud!');
      }
      const is_exist_email = await this.studentRepository.findOne({
        where: { email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Bunday email mavjud!');
      }
      const is_exist_phone = await this.studentRepository.findOne({
        where: { phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Bunday telefon raqam mavjud!');
      }
      const is_exist_telegram = await this.studentRepository.findOne({
        where: { telegram_username },
      });
      if (is_exist_telegram) {
        throw new BadRequestException('Bunday telegram username mavjud!');
      }
      const id: string = v4();
      let hashed_password: string;
      try {
        hashed_password = await hash(studentDto.password, 7);
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
        const student = await this.studentRepository.create({
          id,
          hashed_password,
          image: image_name,
          ...studentDto,
        });
        return {
          message: "Talaba ro'yxatga qo'shildi",
          student_id: student.id,
        };
      }
      const student = await this.studentRepository.create({
        id,
        hashed_password,
        ...studentDto,
      });
      return {
        message: "Talaba ro'yxatga qo'shildi",
        student_id: student.id,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto, res: Response): Promise<object> {
    try {
      const { login, password } = loginDto;
      const student = await this.studentRepository.findOne({
        where: { login },
      });
      if (!student) {
        throw new BadRequestException('Login mos kelmadi!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, student.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Parol mos kelmadi!');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      student.is_active = true;
      const jwt_payload = {
        id: student.id,
        is_active: student.is_active,
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
        message: 'Talaba tizimga kirdi',
        id: student.id,
        access_token: token.access_token,
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
      await this.studentRepository.update(
        { is_active: false },
        { where: { id: check.id }, returning: true },
      );
      res.clearCookie(refresh_token);
      return { message: 'Talaba tizimda chiqdi' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      const students = await this.studentRepository.findAll({
        include: { all: true },
      });
      if (!students.length) {
        throw new BadRequestException("Talabalar ro'yxati bo'sh!");
      }
      return students;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByLogin(login: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { login },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { email },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByName(full_name: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { full_name },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    studentDto: StudentDto,
    image?: any,
  ): Promise<object> {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      const { login, email, phone_number, telegram_username } = studentDto;
      const is_exist_login = await this.studentRepository.findOne({
        where: { login },
      });
      if (is_exist_login) {
        throw new BadRequestException('Bunday login mavjud!');
      }
      const is_exist_email = await this.studentRepository.findOne({
        where: { email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Bunday email mavjud!');
      }
      const is_exist_phone = await this.studentRepository.findOne({
        where: { phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Bunday telefon raqam mavjud!');
      }
      const is_exist_telegram = await this.studentRepository.findOne({
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
        await this.studentRepository.update(
          { ...studentDto, image: image_name },
          { where: { id }, returning: true },
        );
        return { message: "Talaba ma'lumotlari o'zgartirildi" };
      }
      await this.studentRepository.update(studentDto, {
        where: { id },
        returning: true,
      });
      return { message: "Talaba ma'lumotlari o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) {
        throw new BadRequestException('Talaba topilmadi!');
      }
      await this.studentRepository.destroy({ where: { id } });
      return { message: "Talaba ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
