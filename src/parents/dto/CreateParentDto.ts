export class CreateParentDto {
  branch_id: string;
  username: string;
  password: string;
  email: string;
  join_date: Date;
  first_name: string;
  last_name: string;
  phone: string;
  dob: Date;
  gender: string;
  nationality: string;
  ethnicity: string;
  religion: string;
  village: string;
  district: string;
  province: string;
  address: string;
  occupation: string;
  working_place: string;
  is_active?: boolean;

  // ✅ เพิ่มสอง field สำหรับไฟล์
  profile_pic?: string;
  id_card?: string;
}
