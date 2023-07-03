import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/models/question.model';

interface AnswerAttributes {
  answer: string;
  is_true: boolean;
  question_id: number;
}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerAttributes> {
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
  a: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  b: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  c: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  d: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  true_answer: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;
}
