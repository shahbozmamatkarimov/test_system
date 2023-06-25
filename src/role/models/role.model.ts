import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { Staff } from 'src/staff/models/staff.model';
import { StaffRole } from './staff-role.model';

interface RoleAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleAttributes> {
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
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(()=> Staff, ()=> StaffRole)
  staffs: Staff[];
}
