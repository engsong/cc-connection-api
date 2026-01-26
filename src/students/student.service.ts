import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './student.entity';
import { Parent } from '../parents/parent.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { Province } from '../location/province.entity';
import { District } from '../location/district.entity';
import { SearchStudentsDto } from './dto/search-students.dto';

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

  async searchByClass(dto: SearchStudentsDto) {
    const query = this.studentRepo.createQueryBuilder('student')
      .leftJoinAndSelect('student.classId', 'class')
      .leftJoinAndSelect('student.branch', 'branch')
      .leftJoinAndSelect('student.academicYear', 'academicYear')
      .where('student.is_deleted = :isDeleted', { isDeleted: false });

    // Filter by class ID(s)
    if (dto.classIds?.length) {
      query.andWhere('student.class_id IN (:...classIds)', { classIds: dto.classIds });
    }

    // Search by text (name or student_id)
    if (dto.searchText) {
      const search = `%${dto.searchText.trim()}%`;
      query.andWhere(
        '(student.first_name ILIKE :search OR student.last_name ILIKE :search OR student.student_id ILIKE :search)',
        { search },
      );
    }

    // Filter active/inactive
    if (dto.isActive !== undefined) {
      query.andWhere('student.is_active = :isActive', { isActive: dto.isActive });
    }

    // Sorting
    if (dto.sortBy) {
      const order = dto.sortOrder === 'DESC' ? 'DESC' : 'ASC';
      if (dto.sortBy === 'name') {
        query.orderBy('student.first_name', order).addOrderBy('student.last_name', order);
      } else if (dto.sortBy === 'student_id') {
        query.orderBy('student.student_id', order);
      } else if (dto.sortBy === 'created_at') {
        query.orderBy('student.created_at', order);
      }
    } else {
      query.orderBy('student.created_at', 'DESC');
    }

    // Pagination
    const page = dto.page || 1;
    const limit = dto.limit || 20;
    query.skip((page - 1) * limit).take(limit);

    const [students, total] = await query.getManyAndCount();

    return {
      data: students,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
