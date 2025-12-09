import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateYearLevelDto {
  @IsString()
  branch_id: string;

  @IsString()
  academic_year_id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}
