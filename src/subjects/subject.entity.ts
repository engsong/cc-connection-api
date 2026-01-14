import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { Lesson } from '../lessons/lesson.entity';
import { Teaching } from '../teaching/teaching.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.subjects, {
    nullable: false,
    onDelete: 'RESTRICT', // หรือ CASCADE ตาม business
  })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ length: 255 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.subject)
  lessons: Lesson[];

  @OneToMany(() => Teaching, (t) => t.teacher)
  teachings: Teaching[];
}
