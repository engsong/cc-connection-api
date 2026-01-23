import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('participation_scores')
export class ParticipationScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  branchId: number;

  @Column()
  academicYearId: number;

  @Column('jsonb') // store array of participant scores
  scores: { participationId: string; participationName: string; score: number }[];

  @Column()
  addedBy: string; // admin id

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
