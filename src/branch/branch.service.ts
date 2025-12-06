import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './branch.entity';

import { randomUUID } from 'crypto';
import { CreateBranchDto } from './create-branch.dto';
import { UpdateBranchDto } from './update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private repo: Repository<Branch>,
  ) {}

  async create(dto: CreateBranchDto) {
    const data = this.repo.create({
      id: randomUUID(),
      ...dto,
      created_at: new Date(),
    });

    return this.repo.save(data);
  }

  async findAll() {
    return this.repo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id, is_deleted: false } });
    if (!item) throw new NotFoundException('Branch not found');
    return item;
  }

  async update(id: string, dto: UpdateBranchDto) {
    const branch = await this.findOne(id);

    const updated = {
      ...branch,
      ...dto,
      updated_at: new Date(),
    };

    return this.repo.save(updated);
  }

  async softDelete(id: string) {
    const branch = await this.findOne(id);

    branch.is_deleted = true;
    branch.updated_at = new Date();

    return this.repo.save(branch);
  }
}
