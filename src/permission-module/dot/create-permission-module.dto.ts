import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
