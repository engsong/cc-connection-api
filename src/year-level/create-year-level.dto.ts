import { IsNotEmpty, IsString } from 'class-validator';

export class CreateYearLevelDto {
  @IsString()
  @IsNotEmpty()
  branch_id: string;

  @IsString()
  @IsNotEmpty()
  academic_year: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
