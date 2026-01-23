import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ParticipationScore } from '../participantion_score/participation-score.entity';

@Entity('participation_list')
export class ParticipationList {
  @PrimaryGeneratedColumn('uuid') // ใช้ uuid
  id: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  score: string;

   @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}
