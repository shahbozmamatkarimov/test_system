import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject) private subjectRepository: typeof Subject,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<object> {
    try {
      const exist_title = await this.subjectRepository.findOne({
        where: { title: createSubjectDto.title },
      });
      if (exist_title) {
        throw new BadRequestException('Subject already exists!');
      }
      const new_subject = await this.subjectRepository.create(createSubjectDto);
      return { message: 'Subject created succesully', subject: new_subject };
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
        throw new BadRequestException('Subjects not found!');
      }
      return subjects;
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
        throw new BadRequestException('Subject not found!');
      }
      return subject;
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
        throw new BadRequestException('Subject not found!');
      }
      return subject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<object> {
    try {
      const subject = await this.subjectRepository.update(updateSubjectDto, {
        where: { id },
        returning: true,
      });
      if (!subject[1].length) {
        throw new BadRequestException('Subject not found!');
      }
      return { message: 'Subject deleted succesfully', subject: subject[1][0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const subject = await this.subjectRepository.findByPk(id);
      if (!subject) {
        throw new BadRequestException('Subject not found!');
      }
      await this.subjectRepository.destroy({ where: { id } });
      return { message: 'Subject deleted successfully', subject };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
