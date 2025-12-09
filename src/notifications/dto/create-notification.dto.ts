import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  branch_id?: string;

  @IsOptional()
  @IsUUID()
  academic_year_id?: string;

  @IsOptional()
  @IsNumber()
  target_type?: number;

  @IsOptional()
  @IsNumber()
  target?: number;
}
