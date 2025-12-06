import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryColumn()
  id: string;

  @Column()
  branch_id: string;

  @Column()
  academic_year: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  appointment_place: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  from_time: string;

  @Column({ type: 'time' })
  to_time: string;

  @Column({ type: 'date', nullable: true })
  rescheduled_date: Date;

  @Column({ type: 'time', nullable: true })
  rescheduled_from_time: string;

  @Column({ type: 'time', nullable: true })
  rescheduled_to_time: string;

  @Column()
  auditor_id: string;

  @Column()
  status: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
