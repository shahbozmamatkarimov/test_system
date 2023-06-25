import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';
import { StaffGroup } from 'src/group/models/staff-group.model';
import { Role } from 'src/role/models/role.model';
import { StaffRole } from 'src/role/models/staff-role.model';
import { StaffSubject } from 'src/subject/models/staff-subject.model';
import { Subject } from 'src/subject/models/subject.model';

interface StaffAttributes {
  full_name: string;
  image: string;
  phone_number: string;
  email: string;
  login: string;
  hashed_password: string;
  telegram_username: string;
}

@Table({ tableName: 'staff' })
export class Staff extends Model<Staff, StaffAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
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
  })
  telegram_username: string;

  @BelongsToMany(() => Role, () => StaffRole)
  roles: Role[];

  @BelongsToMany(() => Subject, () => StaffSubject)
  subjects: Subject[];

  @BelongsToMany(() => Group, () => StaffGroup)
  groups: Group[];
}
