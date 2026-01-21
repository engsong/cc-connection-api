import { IsString, IsOptional, IsUUID, IsEnum, IsDateString } from 'class-validator';

export const AddedByTypes = ['admin', 'parent', 'teacher', 'staff', 'superadmin'] as const;
export type AddedByType = (typeof AddedByTypes)[number];

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsDateString()
  deadline: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  student_id?: string;

  @IsUUID()
  added_by_id: string;

  @IsEnum(AddedByTypes)
  added_by_type: AddedByType;
}
