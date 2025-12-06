import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { AcademicYear } from './academic.entity';
import { CreateAcademicYearDto } from './create-academic-year.dto';
import { UpdateAcademicYearDto } from './update-academic-year.dto';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectRepository(AcademicYear)
    private repo: Repository<AcademicYear>,
  ) {}

  async create(dto: CreateAcademicYearDto) {
    const data = this.repo.create({
      id: randomUUID(),
      academic_year: dto.academic_year,
      created_at: new Date(),
    });

    return this.repo.save(data);
  }

  async findAll() {
    return this.repo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({ where: { id, is_deleted: false } });
    if (!data) throw new NotFoundException('Academic Year not found');
    return data;
  }

  async update(id: string, dto: UpdateAcademicYearDto) {
    const data = await this.findOne(id);

    const updated = {
      ...data,
      ...dto,
      updated_at: new Date(),
    };

    return this.repo.save(updated);
  }
}
