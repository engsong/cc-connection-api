// permissions.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { Role } from '../role/role.entity';

// ใช้ forwardRef แก้ circular dependency
import { PermissionModule } from '../permission_modules/permission_module.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.permissions, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    () => PermissionModule,
    (module: PermissionModule) => module.permissions,
    { nullable: false }
  )
  @JoinColumn({ name: 'permission_module_id' })
  permission_module: PermissionModule;

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

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
