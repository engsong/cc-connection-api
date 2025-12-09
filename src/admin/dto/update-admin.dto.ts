export class UpdateAdminDto {
  branch_id?: string;
  username?: string;
  password?: string;
  email?: string;
  join_date?: Date;
  first_name?: string;
  last_name?: string;
  phone?: string;
  dob?: Date;
  gender?: string;
  notes?: string;
  village?: string;
  district?: string;
  province?: string;
  admin_type?: string;
  current_academic_year?: string;
  role_id?: string;
  is_active?: boolean;
  is_deleted?: boolean;
}
