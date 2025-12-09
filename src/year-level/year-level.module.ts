import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearLevelService } from './year-level.service';
import { YearLevelController } from './year-level.controller';
import { YearLevel } from './year-level.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YearLevel, Branch, AcademicYear])],
  providers: [YearLevelService],
  controllers: [YearLevelController],
})
export class YearLevelModule {}
