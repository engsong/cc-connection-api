import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointment_persons')
export class AppointmentPerson {
  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  branch_id: string;

  @Column({ type: 'varchar', length: 24 })
  appointment_id: string;

  @Column({ type: 'varchar', length: 50 })
  academic_year: string;

  @Column({ type: 'varchar', length: 100 })
  person_id: string;

  @Column({ type: 'varchar', length: 50 })
  person_type: string;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  status: string;

  @Column({ type: 'text' })
  notes: string;

  @Column({ type: 'int', default: 0 })
  declined_count: number;

  @Column({ type: 'int', default: 0 })
  rescheduled_count: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
