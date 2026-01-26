import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('participation_scores')
export class ParticipationScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  branchId: string;

  @Column({ type: 'uuid', nullable: true })
  academicYearId: string;

  @Column({ type: 'varchar', nullable: true })
  classId: string;

  @Column({ type: 'jsonb' })
  scores: {
    studentId: string;
    participationId: string;
    participationName: string;
    score: number;
  }[];

  @Column({ type: 'varchar' })
  addedBy: string;

  @Column({ type: 'date', nullable: true })
  date: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}