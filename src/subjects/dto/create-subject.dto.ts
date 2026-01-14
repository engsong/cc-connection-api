import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNumber()
  branch_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
