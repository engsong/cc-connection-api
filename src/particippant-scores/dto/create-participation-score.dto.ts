export class CreateParticipationScoreDto {
  student_id: string;
  branch_id: string;
  academic_year_id: string;
  participation_list_id: string;
  added_by_admin_id: string;
  score: number;
  date?: Date;
}
