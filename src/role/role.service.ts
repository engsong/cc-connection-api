import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreateRoleDto) {
    const branch = await this.branchRepo.findOne({
      where: { id: dto.branch_id },
    });
    if (!branch) throw new NotFoundException('Branch not found');

    const addedBy = await this.adminRepo.findOne({
      where: { id: dto.added_by_id },
    });
    if (!addedBy) throw new NotFoundException('Admin (added_by) not found');

    const newRole = this.roleRepo.create({
      name: dto.name,
      branch_id: branch.id,
      branch,
      added_by_id: addedBy.id,
      added_by: addedBy,
    });

    return this.roleRepo.save(newRole);
  }

  async findAll() {
    return this.roleRepo.find({
      where: { is_deleted: false },
      relations: ['branch', 'added_by'],
    });
  }

  async findOne(id: string) {
    const role = await this.roleRepo.findOne({
      where: { id, is_deleted: false },
      relations: ['branch', 'added_by'],
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, dto: any) {
    const role = await this.findOne(id); // ensure exists

    if (dto.branch_id) {
      const branch = await this.branchRepo.findOne({
        where: { id: dto.branch_id },
      });
      if (!branch) throw new NotFoundException('Branch not found');
      role.branch = branch;
      role.branch_id = branch.id;
    }

    if (dto.added_by_id) {
      const addedBy = await this.adminRepo.findOne({
        where: { id: dto.added_by_id },
      });
      if (!addedBy) throw new NotFoundException('Admin (added_by) not found');
      role.added_by = addedBy;
      role.added_by_id = addedBy.id;
    }

    if (dto.name !== undefined) role.name = dto.name;
    if (dto.is_deleted !== undefined) role.is_deleted = dto.is_deleted;

    return this.roleRepo.save(role);
  }

  async delete(id: string) {
    const role = await this.findOne(id);
    role.is_deleted = true;
    return this.roleRepo.save(role);
  }
}
