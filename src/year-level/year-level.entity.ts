import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { Class } from '../classes/class.entity';

@Entity('year_levels')
export class YearLevel {
  @PrimaryColumn()
  id: string;

  // -----------------------------
  // Foreign Key: branch_id → branches.id
  // -----------------------------
  @Column()
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.yearLevels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  // -----------------------------
  // Foreign Key: academic_year_id → academic_years.id
  // -----------------------------
  @Column()
  academic_year_id: string;

  @ManyToOne(() => AcademicYear, (ay) => ay.yearLevels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  // -----------------------------
  // Other columns
  // -----------------------------
  @Column()
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @OneToMany(() => Class, (c) => c.yearLevel)
  classes: Class[];
}
