import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeachingDto {
  @IsString()
  @IsNotEmpty()
  academic_year: string;

  @IsString()
  @IsNotEmpty()
  branch_id: string;

  @IsString()
  @IsNotEmpty()
  teacher_id: string; // admin.id

  @IsString()
  @IsNotEmpty()
  class_id: string;

  @IsString()
  @IsNotEmpty()
  subject_id: string;

  @IsString()
  @IsNotEmpty()
  time_table: string;
}
