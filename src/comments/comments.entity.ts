import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AuditorType {
  ADMIN = 'ADMIN',
  PARENT = 'PARENT',
}

export enum ModuleType {
  TASK = 'TASK',
  EVENT = 'EVENT',
  EVENT_ACTIVITY = 'EVENT_ACTIVITY',
}

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comment: string;

  @Column({ type: 'uuid' })
  auditor_id: string; // admin_id หรือ parent_id

  @Column({ type: 'enum', enum: AuditorType })
  auditor_type: AuditorType;

  @Column({ type: 'uuid' })
  module_id: string;

  @Column({ type: 'enum', enum: ModuleType })
  module_type: ModuleType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
