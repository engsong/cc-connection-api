import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateParticipationListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  score?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty({ message: 'At least one classId is required' })
  classIds: string[];
}