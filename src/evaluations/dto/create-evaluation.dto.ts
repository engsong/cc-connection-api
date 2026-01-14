export class CreateEvaluationDto {
  subject_id: number;
  lesson_id: number;
  lesson_info_id: number;
  admin_id: number;
  class_id: number;
  student_id: number;
  score?: number;
  created_at?: Date;
  updated_at?: Date;
}
