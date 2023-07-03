import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';
import { TestResult } from 'src/test-result/models/test-result.model';

interface StudentsAttributes {
  id: string;
  full_name: string;
  image: string;
  phone_number: string;
  email: string;
  login: string;
  hashed_password: string;
  telegram_username: string;
  is_active: boolean;
  group_id: number;
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentsAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  telegram_username: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group;

  @HasMany(() => TestResult)
  test_results: TestResult[];
}
