import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.parents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ length: 255, nullable: true })
  username: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  join_date: Date;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ length: 50 })
  gender: string;

  @Column({ length: 100 })
  nationality: string;

  @Column({ length: 100 })
  ethnicity: string;

  @Column({ length: 100 })
  religion: string;

  @Column({ length: 255 })
  village: string;

  @Column({ length: 255 })
  district: string;

  @Column({ length: 255 })
  province: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 255 })
  occupation: string;

  @Column({ length: 255 })
  working_place: string;

  // ✅ Add image columns
  @Column({ length: 255, nullable: true })
  profile_pic: string;

  @Column({ length: 255, nullable: true })
  id_card: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
