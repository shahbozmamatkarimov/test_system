import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { FilesService } from 'src/files/files.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { Response } from 'express';
import { generateToken, writeToCookie } from 'src/utils/token';
import { LoginDto } from './dto/login.dto';
import { EmailDto } from './dto/email.dto';
import { FirstNameDto } from './dto/firstname.dto';
import { LastNameDto } from './dto/lastname.dto';
import { UsernameDto } from './dto/username.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly fileService: FilesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
    image: any,
    res: Response,
  ): Promise<object> {
    try {
      const is_exist_email = await this.studentRepository.findOne({
        where: { email: registerDto.email },
      });
      if (is_exist_email) {
        throw new BadRequestException('Email already exists!');
      }
      const is_exist_username = await this.studentRepository.findOne({
        where: { username: registerDto.username },
      });
      if (is_exist_username) {
        throw new BadRequestException('Username already exists!');
      }
      const is_exist_phone = await this.studentRepository.findOne({
        where: { phone_number: registerDto.phone_number },
      });
      if (is_exist_phone) {
        throw new BadRequestException('Phone number already exists!');
      }
      let hashed_password: string;
      try {
        hashed_password = await hash(registerDto.password, 7);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const new_student = await this.studentRepository.create({
        ...registerDto,
        hashed_password,
        image: image_name,
      });
      const jwt_payload = {
        id: new_student.id,
        is_student: new_student.is_student,
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
        student: new_student,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto, res: Response): Promise<object> {
    try {
      const { email, password } = loginDto;
      const student = await this.studentRepository.findOne({
        where: { email },
      });
      if (!student) {
        throw new BadRequestException('Email not found!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, student.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Wrong password!');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const jwt_payload = {
        id: student.id,
        is_active: student.is_student,
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
        access_token: token.access_token,
        student,
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
      res.clearCookie(refresh_token);
      return {
        message: 'Student logged out successfully',
      };
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
        throw new BadRequestException('Students not found!');
      }
      return students;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: EmailDto): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { email: email.email },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByFirstName(first_name: FirstNameDto): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { first_name: first_name.first_name },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByLastName(last_name: LastNameDto): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { last_name: last_name.last_name },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByUsername(username: UsernameDto): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { username: username.username },
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<Student> {
    try {
      const student = await this.studentRepository.findByPk(id, {
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      return student;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
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
        const student = await this.studentRepository.update(
          { ...updateStudentDto, image: image_name },
          { where: { id }, returning: true },
        );
        if (!student[1].length) {
          throw new BadRequestException('Student not found!');
        }
        return {
          message: 'Student updated succesfully',
          student: student[1][0],
        };
      }
      const student = await this.studentRepository.update(updateStudentDto, {
        where: { id },
        returning: true,
      });
      if (!student[1].length) {
        throw new BadRequestException('Student not found!');
      }
      return {
        message: 'Student updated succesfully',
        student: student[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const student = await this.studentRepository.findByPk(id, {
        include: { all: true },
      });
      if (!student) {
        throw new BadRequestException('Student not found!');
      }
      await this.studentRepository.destroy({ where: { id } });
      return { message: 'Student deleted successfully', student };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
