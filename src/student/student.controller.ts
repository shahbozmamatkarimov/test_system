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
import { StudentService } from './student.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { StudentDto } from './dto/student.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'register of student' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() studentDto: StudentDto, @UploadedFile() image: any) {
    return this.studentService.create(studentDto, image);
  }

  @ApiOperation({ summary: 'login of student' })
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.studentService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'logout of student' })
  @Post('logout')
  @UseGuards(AuthGuard)
  logout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentService.logout(refresh_token, res);
  }

  @ApiOperation({ summary: 'get all students' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'get student by email' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param() id: string) {
    return this.studentService.findById(id);
  }

  @ApiOperation({ summary: 'get student by email' })
  @Get('login')
  @UseGuards(AuthGuard)
  findByLogin(@Body() login: string) {
    return this.studentService.findByLogin(login);
  }

  @ApiOperation({ summary: 'get student by email' })
  @Get('email')
  @UseGuards(AuthGuard)
  findByEmail(@Body() email: string) {
    return this.studentService.findByEmail(email);
  }

  @ApiOperation({ summary: 'get student by first name' })
  @Get('fullname')
  @UseGuards(AuthGuard)
  findByName(@Body() full_name: string) {
    return this.studentService.findByName(full_name);
  }

  @ApiOperation({ summary: 'update student by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
    @UploadedFile() image: any,
  ) {
    return this.studentService.update(id, studentDto, image);
  }

  @ApiOperation({ summary: 'delete student by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
