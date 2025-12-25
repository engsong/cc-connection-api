import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Admin, { nullable: true }) // allow nulls temporarily
  @JoinColumn({ name: 'added_by_id' })
  added_by: Admin;

  @Column({ type: 'uuid', nullable: true }) // allow null
  added_by_id: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'uuid', nullable: true }) // allow null for existing rows
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.roles, { nullable: true })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}
