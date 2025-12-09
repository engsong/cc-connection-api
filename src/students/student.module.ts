import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { Parent } from '../parents/parent.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { Province } from '../location/province.entity';
import { District } from '../location/district.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Parent,
      Branch,
      AcademicYear,
      Province,
      District,
    ]),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
