import { IsOptional, IsString } from 'class-validator';

export class UpdateLevelDto {
  @IsOptional()
  @IsString()
  branch_id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
