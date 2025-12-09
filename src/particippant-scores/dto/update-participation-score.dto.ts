export class UpdateParticipationScoreDto {
  student_id?: string;
  branch_id?: string;
  academic_year_id?: string;
  participation_list_id?: string;
  date?: Date;
  score?: number;
  added_by?: string;
}
