import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/models/answer.model';
import { TestGroup } from 'src/test-group/models/test-group.model';

interface QuestionAttributes {
  question: string;
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

  @ForeignKey(() => TestGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_group_id: number;

  @BelongsTo(() => TestGroup)
  test_group: TestGroup;

  @HasMany(() => Answer)
  answers: Answer[];
}
