import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { YearLevel } from '../year-level/year-level.entity';
import { Saving } from '../savings/savings.entity';
import { Teaching } from '../teaching/teaching.entity';

@Entity('classes')
export class Class {
  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  // -----------------------------
  // Foreign Key: branch_id → branches.id
  // -----------------------------
  @Column({ type: 'varchar', length: 100 })
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  // -----------------------------
  // Foreign Key: academic_year_id → academic_years.id
  // -----------------------------
  @Column({ type: 'varchar', length: 50 })
  academic_year_id: string;

  @ManyToOne(() => AcademicYear, (ay) => ay.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  // -----------------------------
  // Foreign Key: year_level_id → year_levels.id
  // -----------------------------
  @Column({ type: 'varchar', length: 24 })
  year_level_id: string;

  @ManyToOne(() => YearLevel, (yl) => yl.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'year_level_id' })
  yearLevel: YearLevel;

  // -----------------------------
  // Other columns
  // -----------------------------
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  saving_wallet: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Saving, (saving) => saving.branch)
  savings: Saving[];

  @OneToMany(() => Teaching, (t) => t.teacher)
  teachings: Teaching[];
}
