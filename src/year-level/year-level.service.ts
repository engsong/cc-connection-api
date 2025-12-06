import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YearLevel } from './year-level.entity';

import { randomUUID } from 'crypto';
import { CreateYearLevelDto } from './create-year-level.dto';
import { UpdateYearLevelDto } from './update-year-level.dto';

@Injectable()
export class YearLevelService {
  constructor(
    @InjectRepository(YearLevel)
    private repo: Repository<YearLevel>,
  ) {}

  async create(dto: CreateYearLevelDto) {
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
    const year = await this.repo.findOne({ where: { id, is_deleted: false } });
    if (!year) throw new NotFoundException('Year Level not found');
    return year;
  }

  async update(id: string, dto: UpdateYearLevelDto) {
    const existing = await this.findOne(id);

    const updated = {
      ...existing,
      ...dto,
      updated_at: new Date(),
    };

    return this.repo.save(updated);
  }

  async softDelete(id: string) {
    const year = await this.findOne(id);

    year.is_deleted = true;
    year.updated_at = new Date();

    return this.repo.save(year);
  }
}
