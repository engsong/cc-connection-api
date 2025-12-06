import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcademicYearController } from './academic-year.controller';
import { AcademicYearService } from './academic-year.service';
import { AcademicYear } from './academic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicYear]), // Register Entity
  ],
  controllers: [AcademicYearController],
  providers: [AcademicYearService],
})
export class AcademicYearModule {}
