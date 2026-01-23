import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { YearLevel } from '../year-level/year-level.entity';
import { Appointment } from '../appointment/appointment.entity';
import { AppointmentPerson } from '../appointment-person/appointment-person.entity';
import { Class } from '../classes/class.entity';
import { Saving } from '../savings/savings.entity';
import { ParticipationScore } from '../participantion_score/participation-score.entity';

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

  @OneToMany(() => YearLevel, (yl) => yl.branch)
  yearLevels: YearLevel[];

  @OneToMany(() => Appointment, (a) => a.academicYear)
  appointments: Appointment[];

  @OneToMany(() => AppointmentPerson, (ap) => ap.appointment)
  appointmentPersons: AppointmentPerson[];

  @OneToMany(() => Class, (c) => c.branch)
  classes: Class[];
  @OneToMany(() => Saving, (saving) => saving.branch)
  savings: Saving[];

  @OneToMany(() => ParticipationScore, (ps) => ps.branchId)
  participationScores: ParticipationScore[];
}
