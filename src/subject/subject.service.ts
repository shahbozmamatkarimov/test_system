import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';
import { SubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject) private subjectRepository: typeof Subject,
  ) {}

  async create(subjectDto: SubjectDto): Promise<object> {
    try {
      const exist_title = await this.subjectRepository.findOne({
        where: { title: subjectDto.title },
      });
      if (exist_title) {
        throw new BadRequestException('Bunday nomli fan mavjud!');
      }
      await this.subjectRepository.create(subjectDto);
      return { message: "Fan ro'yxatga qo'shildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Subject[]> {
    try {
      const subjects = await this.subjectRepository.findAll({
        include: { all: true },
      });
      if (!subjects.length) {
        throw new BadRequestException("Fanlar ro'yxati bo'sh!");
      }
      return subjects;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<Subject> {
    try {
      const subject = await this.subjectRepository.findByPk(id, {
        include: { all: true },
      });
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      return subject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByTitle(title: string): Promise<Subject> {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { title },
        include: { all: true },
      });
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      return subject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, subjectDto: SubjectDto): Promise<object> {
    try {
      const exist_title = await this.subjectRepository.findOne({
        where: { title: subjectDto.title },
      });
      if (exist_title) {
        throw new BadRequestException('Bunday nomli fan mavjud!');
      }
      const subject = this.subjectRepository.findByPk(id);
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      await this.subjectRepository.update(subjectDto, {
        where: { id },
        returning: true,
      });
      return { message: "Fan o'zgartirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const subject = await this.subjectRepository.findByPk(id);
      if (!subject) {
        throw new BadRequestException('Fan topilmadi!');
      }
      await this.subjectRepository.destroy({ where: { id } });
      return { message: "Fan ro'yxatdan o'chirildi" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
