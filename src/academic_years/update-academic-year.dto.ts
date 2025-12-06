import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAcademicYearDto {
  @IsString()
  @IsOptional()
  academic_year?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
