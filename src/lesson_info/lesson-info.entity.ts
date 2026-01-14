import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';

@Entity('lesson_infos')
export class LessonInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.lesson_infos, { nullable: false })
  lesson: Lesson;

  @Column({ default: false })
  is_evaluation: boolean;

  @Column({ type: 'decimal', nullable: true })
  evaluation_max_score: number;

  @Column({ type: 'text', nullable: true })
  evaluation_sample: string;

  @Column({ nullable: true })
  lesson_info_no: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  info: string;

  @Column({ nullable: true })
  info_image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
