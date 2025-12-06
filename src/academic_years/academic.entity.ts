import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('academic_years')
export class AcademicYear {
  @PrimaryColumn()
  id: string;

  @Column()
  academic_year: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
