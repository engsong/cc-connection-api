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

export enum AttendanceType {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}


@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'uuid' })
  student_id: string; // foreign key

  @Column({ type: 'enum', enum: ['ABSENT', 'PRESENT'], default: 'PRESENT' })
  type: AttendanceType; // status

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason?: string; // เช่น ลา, มาสาย

  @Column({ type: 'varchar', length: 255, nullable: true })
  remark?: string; // เช่น On time, Late, Left early

  @Column({ type: 'time', nullable: true })
  check_in?: string; // เวลาเช็คอิน

  @Column({ type: 'time', nullable: true })
  check_out?: string; // เวลาเช็คเอาท์

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
