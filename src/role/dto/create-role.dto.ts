import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  added_by: string;

  @IsUUID()
  branch_id: string;
}
