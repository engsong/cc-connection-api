import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
