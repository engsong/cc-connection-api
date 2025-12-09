import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Branch } from '../branch/branch.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  async create(dto: any) {
    const branch = await this.branchRepo.findOne({
      where: { id: dto.branch_id },
    });

    if (!branch) throw new NotFoundException('Branch not found');

    const newRole = this.roleRepo.create({
      name: dto.name,
      added_by: dto.added_by,
      branch_id: dto.branch_id,
      branch,
    });

    return this.roleRepo.save(newRole);
  }

  async findAll() {
    return this.roleRepo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string) {
    const role = await this.roleRepo.findOne({
      where: { id, is_deleted: false },
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, dto: any) {
    await this.findOne(id); // ensure exists
    await this.roleRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.roleRepo.update(id, { is_deleted: true });
    return { message: 'Role deleted' };
  }
}
