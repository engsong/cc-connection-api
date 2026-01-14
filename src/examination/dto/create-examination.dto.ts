export class CreateExaminationDto {
  branch_id: string;
  academic_year: string;
  student_id: string;
  subject_id: string;
  admin_id?: string;
  score: number;
  label: string;
}
