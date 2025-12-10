import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';
import { Admin } from '../admin/admin.entity';

@Entity('participation_scores')
export class ParticipationScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.participationScores, {
    nullable: false,
  })
  student: Student;

  @ManyToOne(() => Branch, { nullable: false })
  branch: Branch;

  @ManyToOne(() => AcademicYear, (year) => year.participationScores, {
    nullable: false,
  })
  academic_year: AcademicYear;

  @Column({ type: 'date', nullable: true })
  date: Date | null;

  // 🔥 Final relation to Admin entity
  @ManyToOne(() => Admin, { nullable: false })
  added_by: Admin;

  @ManyToOne(() => ParticipationList, (list) => list.participationScores, {
    nullable: false,
  })
  participation_list: ParticipationList;

  @Column({ type: 'numeric', default: 0 })
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
