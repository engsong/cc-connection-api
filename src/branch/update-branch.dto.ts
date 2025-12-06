import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateBranchDto {
  @IsString()
  @IsOptional()
  branch_id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  info?: string;

  @IsString()
  @IsOptional()
  owner_name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
