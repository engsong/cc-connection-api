import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ParticipationScore } from '../particippant-scores/participation_scores.entity';

@Entity('participation_list')
export class ParticipationList {
  @PrimaryGeneratedColumn('uuid') // ใช้ uuid
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ParticipationScore, (ps) => ps.participation_list)
  participationScores: ParticipationScore[];
}
