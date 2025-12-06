import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentPersonController } from './appointment-person.controller';
import { AppointmentPersonService } from './appointment-person.service';
import { AppointmentPerson } from './appointment-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentPerson])],
  controllers: [AppointmentPersonController],
  providers: [AppointmentPersonService],
  exports: [AppointmentPersonService],
})
export class AppointmentPersonModule {}
