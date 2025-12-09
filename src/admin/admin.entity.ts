import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { Role } from '../role/role.entity';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Branch, { nullable: false })
  branch: Branch;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'timestamptz' })
  join_date: Date;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  gender: string;

  @Column({ type: 'text' })
  notes: string;

  @Column()
  village: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  admin_type: string;

  @Column()
  current_academic_year: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @ManyToOne(() => Role, { nullable: true })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
