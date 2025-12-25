import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { Branch } from '../branch/branch.entity';
import { Role } from '../role/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  // Create
  async create(dto: CreateAdminDto) {
    const admin = new Admin();

    admin.username = dto.username;

    // Hash the password
    admin.password = await bcrypt.hash(dto.password, 10);

    admin.email = dto.email;

    // Convert string to Date
    admin.join_date = new Date(dto.joinDate);
    admin.dob = new Date(dto.dob);

    admin.first_name = dto.firstName;
    admin.last_name = dto.lastName;
    admin.phone = dto.phone;
    admin.gender = dto.gender;
    admin.notes = dto.notes;
    admin.village = dto.village;
    admin.district = dto.district;
    admin.province = dto.province;
    admin.admin_type = dto.adminType;
    admin.current_academic_year = dto.currentAcademicYear;

    admin.branch = await this.branchRepo.findOneByOrFail({ id: dto.branchId });
    if (dto.roleId) {
      admin.role = await this.roleRepo.findOneByOrFail({ id: dto.roleId });
    }

    return this.adminRepo.save(admin);
  }

  // Get all
  getAll() {
    return this.adminRepo.find({ relations: ['branch', 'role'] });
  }

  // Get by ID
  getById(id: string) {
    return this.adminRepo.findOne({
      where: { id },
      relations: ['branch', 'role'],
    });
  }

  // Update
  async update(id: string, dto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new Error('Admin not found');

    Object.assign(admin, dto);

    if (dto.branch_id)
      admin.branch = await this.branchRepo.findOneByOrFail({
        id: dto.branch_id,
      });

    if (dto.role_id)
      admin.role = await this.roleRepo.findOneByOrFail({ id: dto.role_id });

    return this.adminRepo.save(admin);
  }

  // Delete
  async delete(id: string) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new Error('Admin not found');
    return this.adminRepo.remove(admin);
  }
  findByBranch(branchId: string) {
    return this.adminRepo.find({
      where: { branch: { id: branchId } },
      relations: ['branch'],
    });
  }
}
