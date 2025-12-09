import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { AppointmentPerson } from '../appointment-person/appointment-person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Branch,
      AcademicYear,
      AppointmentPerson, // ✅ Add this
    ]),
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
