import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // This is the UUID of the Admin who added the role
  @IsUUID()
  added_by_id: string;

  @IsUUID()
  branch_id: string;
}
