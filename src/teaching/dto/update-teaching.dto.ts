import { IsOptional, IsString } from 'class-validator';

export class UpdateTeachingDto {
  @IsOptional()
  @IsString()
  academic_year?: string;

  @IsOptional()
  @IsString()
  branch_id?: string;

  @IsOptional()
  @IsString()
  teacher_id?: string;

  @IsOptional()
  @IsString()
  class_id?: string;

  @IsOptional()
  @IsString()
  subject_id?: string;

  @IsOptional()
  @IsString()
  time_table?: string;
}
