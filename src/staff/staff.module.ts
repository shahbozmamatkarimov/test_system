import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { Role } from 'src/role/models/role.model';
import { StaffRole } from 'src/role/models/staff-role.model';
import { FilesModule } from 'src/files/files.module';
import { Subject } from 'src/subject/models/subject.model';
import { JwtModule } from '@nestjs/jwt';
import { Group } from 'src/group/models/group.model';
import { StaffGroup } from 'src/group/models/staff-group.model';
import { RoleModule } from 'src/role/role.module';
import { SubjectModule } from 'src/subject/subject.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Staff,
      Role,
      StaffRole,
      Subject,
      Group,
      StaffGroup,
    ]),
    JwtModule.register({}),
    FilesModule, 
    RoleModule,
    SubjectModule,
    GroupModule,
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
