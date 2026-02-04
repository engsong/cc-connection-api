import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AttendanceType } from '../attendance.entity';

export class CreateAttendanceDto {
  @IsString()
  student_id: string;

  @IsEnum(AttendanceType)
  type: AttendanceType; // PRESENT | ABSENT

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsString()
  check_in?: string; // "08:55"

  @IsOptional()
  @IsString()
  check_out?: string; // "17:05"
}
