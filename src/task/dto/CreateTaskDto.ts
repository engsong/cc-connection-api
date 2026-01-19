// dto/create-task.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  academic_year?: string;

  @IsOptional()
  @IsString()
  branch_id?: string;

  // ✅ ต้องมี
  @IsOptional()
  @IsUUID()
  student_id?: string;
}
