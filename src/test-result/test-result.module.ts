import { Module } from '@nestjs/common';
import { TestResultService } from './test-result.service';
import { TestResultController } from './test-result.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestResult } from './models/test-result.model';
import { Student } from 'src/student/models/student.model';
import { TestGroup } from 'src/test-group/models/test-group.model';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([TestResult, Student, TestGroup]),
    JwtModule.register({}),
  ],
  controllers: [TestResultController],
  providers: [TestResultService],
})
export class TestResultModule {}
