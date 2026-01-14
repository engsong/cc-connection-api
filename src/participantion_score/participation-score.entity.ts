import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participantion_list/participation-list.entity';

@Entity('participation_scores')
export class ParticipationScore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.participationScores)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Branch, (branch) => branch.participationScores)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => AcademicYear, (year) => year.participationScores)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYear;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => ParticipationList, (pl) => pl.participationScores)
@JoinColumn({ name: 'participation_list_id' })
participation_list: ParticipationList; // TypeORM จะใช้ type ของ PK ของ ParticipationList


  @Column()
  score: number;

  @ManyToOne(() => Admin, (admin) => admin.addedParticipationScores)
  @JoinColumn({ name: 'added_by' })
  added_by: Admin;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
