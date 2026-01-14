export class CreateParticipationScoreDto {
  student_id: string;
  branch_id: string;
  academic_year_id: number;
  date: string;
  participation_list_id: number;
  score: number;
  added_by: string;
}
