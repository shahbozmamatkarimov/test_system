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
  student_id: number;
  test_group_id: number;
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  correct_count: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id: number;

  @ForeignKey(() => TestGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_group_id: number;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => TestGroup)
  test_group: TestGroup;
}
