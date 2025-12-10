import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventActivity } from '../eventactivity/eventActivity.entity';
import { File } from '../file/files.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  branch_id: string;

  @Column({ length: 50 })
  academic_year: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  image_path: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => EventActivity, (activity) => activity.event)
  activities: EventActivity[];

  @OneToMany(() => File, (file) => file.event)
  files: File[];
}
