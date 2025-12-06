import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  branch_id: string;

  @IsString()
  @IsNotEmpty()
  academic_year: string;

  @IsString()
  @IsNotEmpty()
  year_level_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumberString()
  saving_wallet?: string = '0.00'; // numeric(18,2) → send as string or number

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}
