import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateYearLevelDto {
  @IsString()
  @IsOptional()
  branch_id?: string;

  @IsString()
  @IsOptional()
  academic_year?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
