import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  // -------------------------
  // BRANCH FK
  // -------------------------
  @Column({ type: 'uuid', nullable: true })
  branch_id: string;

  @ManyToOne(() => Branch, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  // -------------------------
  // Academic Year FK
  // -------------------------
  @Column({ type: 'uuid', nullable: true })
  academic_year_id: string;

  @ManyToOne(() => AcademicYear, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYear;

  @Column({ type: 'smallint', default: 1 })
  target_type: number;

  @Column({ type: 'smallint', default: 1 })
  target: number;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
