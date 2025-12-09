import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  added_by: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'uuid' })
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.roles)
  branch: Branch;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}
