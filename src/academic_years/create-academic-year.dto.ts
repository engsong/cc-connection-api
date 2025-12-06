import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  @IsNotEmpty()
  academic_year: string;
}
