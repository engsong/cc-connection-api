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
import { Student } from '../students/student.entity';
import { ParticipationList } from '../participantion_list/participation_list.entity';

@Entity('classes')
export class Class {
  @PrimaryColumn({ type: 'varchar', length: 36 }) // ← better to use 36 too
  id: string;

  // ───────────────────────────────
  // Foreign Keys
  // ───────────────────────────────
  @Column({ type: 'varchar', length: 36 })
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'varchar', length: 36 })
  academic_year_id: string;

  @ManyToOne(() => AcademicYear, (ay) => ay.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  @Column({ type: 'varchar', length: 36 })
  year_level_id: string;

  @ManyToOne(() => YearLevel, (yl) => yl.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'year_level_id' })
  yearLevel: YearLevel;

  // ───────────────────────────────
  // Other columns (unchanged)
  // ───────────────────────────────
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

  // Relations (unchanged)
  @OneToMany(() => Saving, (saving) => saving.branch)
  savings: Saving[];

  @OneToMany(() => Teaching, (t) => t.teacher)
  teachings: Teaching[];

  @OneToMany(() => Student, (student) => student.classId)
  students: Student[];

  @OneToMany(() => ParticipationList, (list) => list.classes)
  participationLists: ParticipationList[];
}
