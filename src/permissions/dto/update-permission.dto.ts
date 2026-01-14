export class UpdatePermissionDto {
  role_id?: string;
  permission_module_id?: string;
  admin_id?: string;

  can_add?: boolean;
  can_view?: boolean;
  can_edit?: boolean;
  can_update_password?: boolean;
  can_delete?: boolean;
}
