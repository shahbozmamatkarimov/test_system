import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TestGroup } from 'src/test-group/models/test-group.model';

interface QuestionAttributes {
  question: string;
  is_multi_answer: boolean;
  test_group_id: number;
}

@Table({ tableName: 'question' })
export class Question extends Model<Question, QuestionAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_multi_answer: boolean;

  @ForeignKey(() => TestGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_group_id: number;

  @BelongsTo(() => TestGroup)
  test_group: TestGroup;
}
