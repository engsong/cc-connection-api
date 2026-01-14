import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { Lesson } from '../lessons/lesson.entity';
import { LessonInfo } from '../lesson_info/lesson-info.entity';
import { Branch } from '../branch/branch.entity';

@Entity('homework')
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Lesson, { nullable: false })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @ManyToOne(() => LessonInfo, { nullable: false })
  @JoinColumn({ name: 'lesson_info_id' })
  lesson_info: LessonInfo;

  @ManyToOne(() => Branch, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'decimal', nullable: true })
  score?: number;

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date; // ไม่ต้องให้ null
  // ใช้ undefined แทน null

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
