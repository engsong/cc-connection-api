import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('classes')
export class Class {
  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  branch_id: string;

  @Column({ type: 'varchar', length: 50 })
  academic_year: string;

  @Column({ type: 'varchar', length: 24 })
  year_level_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  saving_wallet: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
