import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity('participation_list')
export class ParticipationList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, length: 150 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  score: string; // e.g. "10", "A+", "8.5/10" – or change to decimal later

  @ManyToMany(() => Class, (classEntity) => classEntity.participationLists, {
    cascade: true, // auto-save when saving list
  })
  @JoinTable({
    name: 'participation_list_classes',
    joinColumn: {
      name: 'participation_list_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
  })
  classes: Class[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}