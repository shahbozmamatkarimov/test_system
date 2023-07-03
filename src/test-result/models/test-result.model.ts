import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Student } from 'src/student/models/student.model';
import { TestGroup } from 'src/test-group/models/test-group.model';

interface TestResultAttributes {
  student_id: string;
  test_group_id: number;
  test_result: string;
  correct_count: number;
}

@Table({ tableName: 'test-result' })
export class TestResult extends Model<TestResult, TestResultAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  student_id: string;

  @ForeignKey(() => TestGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_group_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  test_result: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  correct_answers: number;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => TestGroup)
  test_group: TestGroup;
}
