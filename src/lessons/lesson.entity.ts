import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { LessonInfo } from '../lesson_info/lesson-info.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.lessons, { eager: true })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

    @OneToMany(() => LessonInfo, (lessonInfo) => lessonInfo.lesson)
    lesson_infos: LessonInfo[];
}
