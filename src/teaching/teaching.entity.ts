import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { Class } from '../classes/class.entity';
import { Subject } from '../subjects/subject.entity';

@Entity('teaching')
export class Teaching {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  academic_year: string;

  @ManyToOne(() => Branch, (branch) => branch.teachings, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  // teacher_id -> admin.id
  @ManyToOne(() => Admin, (admin) => admin.teachings, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Admin;

  @ManyToOne(() => Class, (cls) => cls.teachings, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.teachings, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ type: 'text' })
  time_table: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
