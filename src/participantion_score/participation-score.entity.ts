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

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => AcademicYear)
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  @ManyToOne(() => ParticipationList)
  @JoinColumn({ name: 'participation_list_id' })
  participationList: ParticipationList;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'added_by' })
  addedBy: Admin;

  @Column()
  score: number;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
