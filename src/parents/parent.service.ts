import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './parent.entity';
import { Branch } from '../branch/branch.entity';
import { randomUUID } from 'crypto';
import { CreateParentDto } from './dto/CreateParentDto';
import { UpdateParentDto } from './dto/UpdateParentDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private repo: Repository<Parent>,
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>, // Inject Branch repository
  ) {}

  // Create parent with branch check
  async create(dto: CreateParentDto) {
    // 1️⃣ Find branch
    const branch = await this.branchRepo.findOne({
      where: { id: dto.branch_id },
    });
    if (!branch) throw new NotFoundException(`Branch not found`);

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3️⃣ Create parent entity
    const parent = this.repo.create({
      id: randomUUID(),
      ...dto,
      password: hashedPassword, // save hashed password
      is_deleted: false,
      created_at: new Date(),
    });

    // 4️⃣ Save to DB
    return this.repo.save(parent);
  }

  async findAll() {
    return this.repo.find({
      where: { is_deleted: false },
      relations: ['branch'],
    });
  }

  async findOne(id: string) {
    const parent = await this.repo.findOne({
      where: { id, is_deleted: false },
      relations: ['branch'],
    });
    if (!parent) throw new NotFoundException(`Parent with ID ${id} not found`);
    return parent;
  }

  async findByBranch(branch_id: string) {
    const branch = await this.branchRepo.findOne({ where: { id: branch_id } });
    if (!branch)
      throw new NotFoundException(`Branch with ID ${branch_id} not found`);
    return this.repo.find({
      where: { branch_id, is_deleted: false },
      relations: ['branch'],
    });
  }

  async update(id: string, dto: UpdateParentDto) {
    const parent = await this.findOne(id);

    // If branch_id is being updated, check it exists
    if (dto.branch_id && dto.branch_id !== parent.branch_id) {
      const branch = await this.branchRepo.findOne({
        where: { id: dto.branch_id },
      });
      if (!branch)
        throw new NotFoundException(
          `Branch with ID ${dto.branch_id} not found`,
        );
    }

    const updated = {
      ...parent,
      ...dto,
      updated_at: new Date(),
    };

    return this.repo.save(updated);
  }

  async softDelete(id: string) {
    const parent = await this.findOne(id);
    parent.is_deleted = true;
    parent.updated_at = new Date();
    return this.repo.save(parent);
  }
}
