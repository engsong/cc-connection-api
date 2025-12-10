import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationScoreService } from './participation-scores.service';
import { ParticipationScoreController } from './participation-scores.controller';

import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';
import { Admin } from '../admin/admin.entity';
import { ParticipationScore } from './participation_scores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParticipationScore,
      Student,
      Branch,
      AcademicYear,
      ParticipationList,
      Admin,
    ]),
  ],
  controllers: [ParticipationScoreController],
  providers: [ParticipationScoreService],
})
export class ParticipationScoresModule {}
