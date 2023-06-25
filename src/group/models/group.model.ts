import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Staff } from 'src/staff/models/staff.model';
import { StaffGroup } from './staff-group.model';

interface GroupAttributes {
  name: string;
  start_date: Date;
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupAttributes> {
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
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @BelongsToMany(() => Staff, () => StaffGroup)
  staffs: Staff[];
}
