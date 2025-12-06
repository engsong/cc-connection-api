import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateAppointmentPersonDto {
  @IsString()
  @IsNotEmpty()
  branch_id: string;

  @IsString()
  @IsNotEmpty()
  appointment_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  academic_year: string;

  @IsString()
  @IsNotEmpty()
  person_id: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Student', 'Parent', 'Teacher', 'Staff', 'Other']) // adjust as needed
  person_type: string;

  @IsOptional()
  @IsString()
  @IsIn([
    'Pending',
    'Accepted',
    'Declined',
    'Rescheduled',
    'Attended',
    'NoShow',
  ])
  status?: string = 'Pending';

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  declined_count?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  rescheduled_count?: number = 0;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}
