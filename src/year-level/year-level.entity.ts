import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('year_levels')
export class YearLevel {
  @PrimaryColumn()
  id: string;

  @Column()
  branch_id: string;

  @Column()
  academic_year: string;

  @Column()
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
