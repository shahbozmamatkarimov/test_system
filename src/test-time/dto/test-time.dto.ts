import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TestTimeDto {
  @ApiProperty({
    type: 'Date',
    example: '2022-02-12',
    description: 'test start time',
  })
  @IsNotEmpty({ message: 'Iltimos, test boshlanish vaqtini kiriting!' })
  @IsDateString(
    {},
    {
      message: "Test boshlanish vaqti to'g'ri formatda kiritilishi zarur!",
    },
  )
  start_time: Date;

  @ApiProperty({
    type: 'Date',
    example: '2022-02-12',
    description: 'test end time',
  })
  @IsNotEmpty({ message: 'Iltimos, test tugash vaqtini kiriting!' })
  @IsDateString(
    {},
    {
      message: "Test tugash vaqti to'g'ri formatda kiritilishi zarur!",
    },
  )
  end_time: Date;

  @ApiProperty({
    type: 'string',
    example: '2adsfkljfds-2kljdsaf-asdf',
    description: 'student id',
  })
  @IsNotEmpty({ message: 'Iltimos, talaba ID sini kiriting!' })
  @IsString({ message: "Talaba ID si matn shaklida bo'lishi zarur!" })
  student_id: string;

  @ApiProperty({
    type: 'number',
    example: '15',
    description: 'test group id',
  })
  @IsNotEmpty({ message: 'Iltimos, test ID sini kiriting!' })
  @IsNumber({}, { message: "Test ID si son shaklida bo'lishi zarur!" })
  test_group_id: number;
}
