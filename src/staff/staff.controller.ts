import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginStaffDto } from './dto/login-staff.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { AddRoleDto } from './dto/addRole.dto';
import { FullNameDto } from './dto/fullname.dto';
import { EmailDto } from './dto/email.dto';
import { AddSubjectDto } from './dto/addSubject.dto';
import { AddGroupDto } from './dto/addGroup.dto';
import { StaffAdminGuard } from 'src/guards/staff-is_admin.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('staffs')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'create a new staff' })
  @UseGuards(IsAdminGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createStaffDto: CreateStaffDto, @UploadedFile() image: any) {
    return this.staffService.create(createStaffDto, image);
  }

  @ApiOperation({ summary: 'login staff' })
  @Post('login')
  login(
    @Body() loginDto: LoginStaffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'logout staff' })
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.logout(refresh_token, res);
  }

  @ApiOperation({ summary: 'add role to staff' })
  @UseGuards(IsAdminGuard)
  @Post('addrole')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.staffService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'remove role from staff' })
  @UseGuards(IsAdminGuard)
  @Post('removerole')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.staffService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'add subject to staff' })
  @UseGuards(IsAdminGuard)
  @Post('addsubject')
  addSubject(@Body() addSubjectDto: AddSubjectDto) {
    return this.staffService.addSubject(addSubjectDto);
  }

  @ApiOperation({ summary: 'remove subject from staff' })
  @UseGuards(IsAdminGuard)
  @Post('removesubject')
  removeSubject(@Body() addSubjectDto: AddSubjectDto) {
    return this.staffService.removeSubject(addSubjectDto);
  }

  @ApiOperation({ summary: 'add group to staff' })
  @UseGuards(IsAdminGuard)
  @Post('addgroup')
  addGroup(@Body() addGroupDto: AddGroupDto) {
    return this.staffService.addGroup(addGroupDto);
  }

  @ApiOperation({ summary: 'remove group from staff' })
  @UseGuards(IsAdminGuard)
  @Post('removegroup')
  removeGroup(@Body() addGroupDto: AddGroupDto) {
    return this.staffService.removeGroup(addGroupDto);
  }

  @ApiOperation({ summary: 'get all staffs' })
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: 'get staff by name' })
  @Get('fullname')
  findByName(@Body() fullname: FullNameDto) {
    return this.staffService.findByName(fullname);
  }

  @ApiOperation({ summary: 'get staff by email' })
  @Get('email')
  findByEmail(@Body() email: EmailDto) {
    return this.staffService.findByEmail(email);
  }

  @ApiOperation({ summary: 'get staff by id' })
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.staffService.findById(id);
  }

  @ApiOperation({ summary: 'update staff by id' })
  @UseGuards(StaffAdminGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    image: any,
  ) {
    return this.staffService.update(id, updateStaffDto, image);
  }

  @ApiOperation({ summary: 'delete staff by id' })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.staffService.remove(id);
  }
}
