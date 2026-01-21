import { IsOptional, IsString, IsUUID, IsEnum, IsDateString } from 'class-validator';
import * as CreateTaskDto from './CreateTaskDto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  student_id?: string;

  @IsOptional()
  @IsUUID()
  added_by_id?: string;

  @IsEnum(CreateTaskDto.AddedByTypes)
    added_by_type: CreateTaskDto.AddedByType;
}
