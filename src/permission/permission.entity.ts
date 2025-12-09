import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Role } from '../role/role.entity';
import { PermissionModule } from '../permission-module/permission-module.entity';
import { Admin } from '../admin/admin.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => PermissionModule, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'permission_module_id' })
  permissionModule: PermissionModule;

  @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ default: false })
  can_add: boolean;

  @Column({ default: false })
  can_view: boolean;

  @Column({ default: false })
  can_edit: boolean;

  @Column({ default: false })
  can_update_password: boolean;

  @Column({ default: false })
  can_delete: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
