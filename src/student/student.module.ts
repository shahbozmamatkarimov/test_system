import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'src/group/models/group.model';
import { Student } from './models/student.model';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Student, Group]),
    FilesModule,
    JwtModule.register({}),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
