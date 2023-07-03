import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/models/question.model';
import { Subject } from 'src/subject/models/subject.model';
import { TestResult } from 'src/test-result/models/test-result.model';

interface TestGroupAttributes {
  test_count: number;
  test_time: string;
  subject_id: number;
}

@Table({ tableName: 'test-group' })
export class TestGroup extends Model<TestGroup, TestGroupAttributes> {
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
  test_count: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  minute: number;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subject_id: number;

  @BelongsTo(() => Subject)
  subject: Subject;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => TestResult)
  test_results: TestResult[];
}
