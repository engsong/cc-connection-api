// src/students/dto/search-students.dto.ts
import { IsOptional, IsUUID, IsArray, IsBoolean, IsString } from 'class-validator';

export class SearchStudentsDto {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  classIds?: string[];          // ← support multiple classes if needed later

  @IsOptional()
  @IsString()
  searchText?: string;          // search by name or student_id

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'student_id' | 'created_at';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 20;
}