import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { Parent } from '../parents/parent.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  comment: string;

  // Separate foreign key for Admin
  @Column({ type: 'uuid', nullable: true })
  admin_id: string;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  // Separate foreign key for Parent
  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @ManyToOne(() => Parent, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  // Optional module and auditor_type fields
  @Column({ type: 'uuid', nullable: true })
  module_id: string;

  @Column({ type: 'int2', nullable: true })
  auditor_type: number;

  // Timestamps
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
