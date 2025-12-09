import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './student.entity';
import { Parent } from '../parents/parent.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { Province } from '../location/province.entity';
import { District } from '../location/district.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Parent)
    private parentRepo: Repository<Parent>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,

    @InjectRepository(AcademicYear)
    private academicYearRepo: Repository<AcademicYear>,

    @InjectRepository(Province)
    private provinceRepo: Repository<Province>,

    @InjectRepository(District)
    private districtRepo: Repository<District>,
  ) {}

  // ================= CREATE =================
  async createStudent(data: any) {
    const student = new Student();

    // Simple columns
    student.student_id = data.student_id;
    student.village_id = data.village_id;
    student.first_name = data.first_name;
    student.last_name = data.last_name;
    student.dob = data.dob;
    student.gender = data.gender;
    student.nationality = data.nationality;
    student.ethnicity = data.ethnicity;
    student.religion = data.religion;
    student.live_with = data.live_with;
    student.address = data.address;
    student.emergency_contacts = data.emergency_contacts || [];
    student.saving_wallet = data.saving_wallet || 0;
    student.profile_image_path = data.profile_image_path;

    // Relations with null check
    const branch = await this.branchRepo.findOne({
      where: { id: data.branchId },
    });
    if (!branch) throw new Error('Branch not found');
    student.branch = branch;

    const academicYear = await this.academicYearRepo.findOne({
      where: { id: data.academicYearId },
    });
    if (!academicYear) throw new Error('AcademicYear not found');
    student.academicYear = academicYear;

    const province = await this.provinceRepo.findOne({
      where: { id: data.provinceId },
    });
    if (!province) throw new Error('Province not found');
    student.province = province;

    const district = await this.districtRepo.findOne({
      where: { id: data.districtId },
    });
    if (!district) throw new Error('District not found');
    student.district = district;

    // Parents
    if (data.parents?.length) {
      student.parents = await this.parentRepo.find({
        where: { id: In(data.parents) },
      });
    }

    return this.studentRepo.save(student);
  }

  // ================= GET ALL =================
  getAllStudents() {
    return this.studentRepo.find({
      relations: ['branch', 'academicYear', 'province', 'district', 'parents'],
    });
  }

  // ================= GET BY ID =================
  getStudentById(id: string) {
    return this.studentRepo.findOne({
      where: { id },
      relations: ['branch', 'academicYear', 'province', 'district', 'parents'],
    });
  }

  // ================= UPDATE =================
  async updateStudent(id: string, data: any) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['parents'],
    });

    if (!student) throw new Error('Student not found');

    // Update simple fields
    Object.assign(student, data);

    // Update relations safely
    if (data.branchId) {
      const branch = await this.branchRepo.findOne({
        where: { id: data.branchId },
      });
      if (!branch) throw new Error('Branch not found');
      student.branch = branch;
    }

    if (data.academicYearId) {
      const academicYear = await this.academicYearRepo.findOne({
        where: { id: data.academicYearId },
      });
      if (!academicYear) throw new Error('AcademicYear not found');
      student.academicYear = academicYear;
    }

    if (data.provinceId) {
      const province = await this.provinceRepo.findOne({
        where: { id: data.provinceId },
      });
      if (!province) throw new Error('Province not found');
      student.province = province;
    }

    if (data.districtId) {
      const district = await this.districtRepo.findOne({
        where: { id: data.districtId },
      });
      if (!district) throw new Error('District not found');
      student.district = district;
    }

    if (data.parents?.length) {
      student.parents = await this.parentRepo.find({
        where: { id: In(data.parents) },
      });
    }

    return this.studentRepo.save(student);
  }

  // ================= DELETE =================
  async deleteStudent(id: string) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new Error('Student not found');
    return this.studentRepo.remove(student);
  }
}
