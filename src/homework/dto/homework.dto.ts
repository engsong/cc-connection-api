// src/homework/dto/homework.dto.ts
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  subject_id: string;

  @IsString()
  lesson_id: string;

  @IsString()
  lesson_info_id: string;

  @IsString()
  branch_id: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsDateString()
  deadline?: string; // string format, e.g. '2026-01-10'
}

export class UpdateHomeworkDto {
  @IsOptional()
  @IsString()
  subject_id?: string;

  @IsOptional()
  @IsString()
  lesson_id?: string;

  @IsOptional()
  @IsString()
  lesson_info_id?: string;

  @IsOptional()
  @IsString()
  branch_id?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
