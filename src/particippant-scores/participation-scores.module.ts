import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationScore } from './participation_scores.entity';
import { ParticipationScoresService } from './participation-scores.service';
import { ParticipationScoresController } from './participation-scores.controller';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParticipationScore,
      Student,
      Branch,
      AcademicYear,
      ParticipationList,
    ]),
  ],
  providers: [ParticipationScoresService],
  controllers: [ParticipationScoresController],
})
export class ParticipationScoresModule {}
