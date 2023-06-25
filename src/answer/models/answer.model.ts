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
  answer: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_true: boolean;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;
}
