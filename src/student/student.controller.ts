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
import { RegisterDto } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { EmailDto } from './dto/email.dto';
import { FirstNameDto } from './dto/firstname.dto';
import { LastNameDto } from './dto/lastname.dto';
import { UsernameDto } from './dto/username.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentSelfGuard } from 'src/guards/student-self.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'register of student' })
  @UseGuards(IsAdminGuard)
  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  register(
    @Body() registerDto: RegisterDto,
    @UploadedFile() image: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentService.register(registerDto, image, res);
  }

  @ApiOperation({ summary: 'login of student' })
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.studentService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'logout of student' })
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentService.logout(refresh_token, res);
  }

  @ApiOperation({ summary: 'get all students' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'get student by email' })
  @Get('email')
  findByEmail(@Body() email: EmailDto) {
    return this.studentService.findByEmail(email);
  }

  @ApiOperation({ summary: 'get student by first name' })
  @Get('firstname')
  findByFirstName(@Body() first_name: FirstNameDto) {
    return this.studentService.findByFirstName(first_name);
  }

  @ApiOperation({ summary: 'get student by last name' })
  @Get('lastname')
  findByLastName(@Body() last_name: LastNameDto) {
    return this.studentService.findByLastName(last_name);
  }

  @ApiOperation({ summary: 'get student by username' })
  @Get('username')
  findByUsername(@Body() username: UsernameDto) {
    return this.studentService.findByUsername(username);
  }

  @ApiOperation({ summary: 'update student by id' })
  @UseGuards(StudentSelfGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateStudentDto,
    @UploadedFile() image: any,
  ) {
    return this.studentService.update(id, updateDto, image);
  }

  @ApiOperation({ summary: 'delete student by id' })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
