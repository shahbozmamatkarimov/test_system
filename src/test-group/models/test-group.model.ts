import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Subject } from 'src/subject/models/subject.model';

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
    type: DataType.STRING,
    allowNull: false,
  })
  test_time: string;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subject_id: number;

  @BelongsTo(() => Subject)
  subject: Subject;
}
