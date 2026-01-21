import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../file/files.entity';
import { Student } from '../students/student.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'timestamptz' })
  deadline: Date;

  @Column({ length: 255, nullable: true })
  description: string;

  // 🔑 id ของคนที่สร้าง (admin.id หรือ parent.id)
  @Column({ type: 'uuid', nullable: true })
  added_by_id: string;

  @Column({ length: 50, nullable: true })
  added_by_type: string; // ไม่ต้อง enum

  @ManyToOne(() => Student, (student) => student.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => File, (file) => file.task)
  files: File[];
}
