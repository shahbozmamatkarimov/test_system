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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginStaffDto } from './dto/login-staff.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { AddRoleDto } from './dto/addRole.dto';
import { AddSubjectDto } from './dto/addSubject.dto';
import { AddGroupDto } from './dto/addGroup.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { StaffDto } from './dto/staff.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('staffs')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'create a new staff' })
  @Post('create')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() staffDto: StaffDto, @UploadedFile() image: any) {
    return this.staffService.create(staffDto, image);
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
  @UseGuards(AuthGuard)
  logout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.logout(refresh_token, res);
  }

  @ApiOperation({ summary: 'add role to staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('addRole')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.staffService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'remove role from staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('removeRole')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.staffService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'add subject to staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('addSubject')
  addSubject(@Body() addSubjectDto: AddSubjectDto) {
    return this.staffService.addSubject(addSubjectDto);
  }

  @ApiOperation({ summary: 'remove subject from staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('removeSubject')
  removeSubject(@Body() addSubjectDto: AddSubjectDto) {
    return this.staffService.removeSubject(addSubjectDto);
  }

  @ApiOperation({ summary: 'add group to staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('addGroup')
  addGroup(@Body() addGroupDto: AddGroupDto) {
    return this.staffService.addGroup(addGroupDto);
  }

  @ApiOperation({ summary: 'remove group from staff' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('removeGroup')
  removeGroup(@Body() addGroupDto: AddGroupDto) {
    return this.staffService.removeGroup(addGroupDto);
  }

  @ApiOperation({ summary: 'get all staffs' })
  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: 'get staff by id' })
  @Get(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.staffService.findById(id);
  }

  @ApiOperation({ summary: 'get staff by name' })
  @Get('login')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findByLogin(@Body() login: string) {
    return this.staffService.findByLogin(login);
  }

  @ApiOperation({ summary: 'get staff by name' })
  @Get('fullname')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findByName(@Body() fullname: string) {
    return this.staffService.findByName(fullname);
  }

  @ApiOperation({ summary: 'get staff by email' })
  @Get('email')
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findByEmail(@Body() email: string) {
    return this.staffService.findByEmail(email);
  }

  @ApiOperation({ summary: 'update staff by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() staffDto: StaffDto, image: any) {
    return this.staffService.update(id, staffDto, image);
  }

  @ApiOperation({ summary: 'delete staff by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
