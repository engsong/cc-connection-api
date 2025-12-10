import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../file/files.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: true })
  academic_year: string;

  @Column({ length: 255, nullable: true })
  branch_id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  added_by: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => File, (file) => file.task) // fix relation: must point to 'file.task'
  files: File[];
}
