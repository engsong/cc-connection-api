import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './level.entity';
import { Branch } from '../branch/branch.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepo: Repository<Level>,

    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {}

  async create(dto: CreateLevelDto) {
    const branch = await this.branchRepo.findOne({
      where: { id: dto.branch_id },
    });
    if (!branch) throw new NotFoundException('Branch not found');

    const level = this.levelRepo.create({
      name: dto.name,
      branch,
    });

    return this.levelRepo.save(level);
  }

  async findAll() {
    return this.levelRepo.find({
      relations: ['branch'],
    });
  }

  async findOne(id: string) {
    const level = await this.levelRepo.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!level) throw new NotFoundException('Level not found');
    return level;
  }

  async update(id: string, dto: UpdateLevelDto) {
    const level = await this.findOne(id);

    if (dto.branch_id) {
      const branch = await this.branchRepo.findOne({
        where: { id: dto.branch_id },
      });
      if (!branch) throw new NotFoundException('Branch not found');
      level.branch = branch;
    }

    if (dto.name) level.name = dto.name;
    level.updated_at = new Date();

    return this.levelRepo.save(level);
  }

  async remove(id: string) {
    const level = await this.findOne(id);
    return this.levelRepo.remove(level);
  }
}
