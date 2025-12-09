import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';

@Entity('participation_scores')
export class ParticipationScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.participationScores, {
    nullable: false,
  })
  student: Student;

  @ManyToOne(() => Branch, (branch) => branch.participationScores, {
    nullable: false,
  })
  branch: Branch;

  @ManyToOne(() => AcademicYear, (year) => year.participationScores, {
    nullable: false,
  })
  academic_year: AcademicYear;

  @Column({ type: 'date', nullable: true })
  date: Date | null;

  @Column({ type: 'uuid', nullable: true })
  added_by: string | null;

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
