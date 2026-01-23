import { ParticipationScoreItemDto } from "./create-participation-score.dto";

export class UpdateParticipationScoreDto {
  student_id?: string;
  branch_id?: string;
  academic_year_id?: number;
  date?: string;
  participation_list_id?: number;
  scores?: ParticipationScoreItemDto[]; // 🔹 ใช้ array แทน score เดี่ยว
  added_by?: string;
}