import { ParticipationScoreItemDto } from './create-participation-score.dto';

export class UpdateParticipationScoreDto {
  student_id?: string;
  branchId?: string;
  academicYearId?: string;
  classId?: string;
  date?: string;
  scores?: ParticipationScoreItemDto[]; // array of scores
  addedBy?: string;
}