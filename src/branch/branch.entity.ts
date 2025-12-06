import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('branches')
export class Branch {
  @PrimaryColumn()
  id: string;

  @Column()
  branch_id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  info: string;

  @Column()
  owner_name: string;

  @Column()
  type: string;

  @Column()
  contact: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
