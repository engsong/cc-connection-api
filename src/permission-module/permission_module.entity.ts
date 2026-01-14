import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Permission } from '../permissions/permissions.entity';

@Entity('permission_modules')
export class PermissionModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // OneToMany ฝั่ง Permission
  @OneToMany(() => Permission, (permission) => permission.permission_module)
  permissions: Permission[];
}
