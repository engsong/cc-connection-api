import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Event } from '../event/events.entity';
import { File } from '../file/files.entity';

@Entity('event_activities')
export class EventActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  branch_id: string;

  @Column({ length: 50 })
  academic_year: string;

  @Column({ type: 'uuid' })
  event_id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Event, (event) => event.activities)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => File, (file) => file.eventActivity)
  files: File[];
}
