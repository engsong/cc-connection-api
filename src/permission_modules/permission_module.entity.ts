// permission_module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Permission } from '../permissions/permissions.entity';

@Entity('permission_modules')
export class PermissionModule {
  @PrimaryGeneratedColumn('uuid')   // <-- แก้ตรงนี้
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  
  @OneToMany(() => Permission, (permission) => permission.permission_module)
  permissions: Permission[];
}
