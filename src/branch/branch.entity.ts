import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { YearLevel } from '../year-level/year-level.entity';
import { Appointment } from '../appointment/appointment.entity';
import { AppointmentPerson } from '../appointment-person/appointment-person.entity';
import { Class } from '../classes/class.entity';
import { Parent } from '../parents/parent.entity';
import { Role } from '../role/role.entity';
import { Saving } from '../savings/savings.entity';
import { Admin } from '../admin/admin.entity';
import { Subject } from '../subjects/subject.entity';
import { Level } from '../levels/level.entity';
import { Teaching } from '../teaching/teaching.entity';
import { ParticipationScore } from '../participantion_score/participation-score.entity';

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

  @OneToMany(() => YearLevel, (yl) => yl.branch)
  yearLevels: YearLevel[];

  @OneToMany(() => Appointment, (a) => a.branch)
  appointments: Appointment[];
  @OneToMany(() => AppointmentPerson, (ap) => ap.appointment)
  appointmentPersons: AppointmentPerson[];

  @OneToMany(() => Class, (c) => c.branch)
  classes: Class[];

  @OneToMany(() => Parent, (parent) => parent.branch)
  parents: Parent[];

  @OneToMany(() => Role, (role) => role.branch)
  roles: Role[];

  @OneToMany(() => Saving, (saving) => saving.branch)
  savings: Saving[];

  @OneToMany(() => ParticipationScore, (ps) => ps.branchId)
  participationScores: ParticipationScore[];

  @OneToMany(() => Admin, (admin) => admin.branch)
  admins: Admin[];
  @OneToMany(() => Subject, (subject) => subject.branch)
  subjects: Subject[];

  @OneToMany(() => Level, (level) => level.branch)
  levels: Level[];
  @OneToMany(() => Teaching, (t) => t.teacher)
  teachings: Teaching[];
}
