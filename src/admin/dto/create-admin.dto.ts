export class CreateAdminDto {
  branchId: string;
  roleId?: string;
  username: string;
  password: string;
  email: string;
  joinDate: string; // <-- ISO string
  firstName: string;
  lastName: string;
  phone: string;
  dob: string; // <-- ISO string
  gender: string;
  notes: string;
  village: string;
  district: string;
  province: string;
  adminType: string;
  currentAcademicYear: string;
}
