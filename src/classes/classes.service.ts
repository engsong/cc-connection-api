import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity'; // or use Prisma below
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private repo: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto) {
    const cls = this.repo.create({
      id: crypto.randomUUID().replace(/-/g, '').slice(0, 24),
      ...dto,
      saving_wallet: dto.saving_wallet || '0.00',
      is_deleted: false,
    });
    return this.repo.save(cls);
  }

  async findAll() {
    return this.repo.find({
      where: { is_deleted: false },
      order: { name: 'ASC' },
    });
  }

  async findByBranch(branchId: string) {
    return this.repo.find({
      where: { branch_id: branchId, is_deleted: false },
      order: { name: 'ASC' },
    });
  }

  async findByAcademicYear(year: string) {
    return this.repo.find({
      where: { academic_year: year, is_deleted: false },
    });
  }

  async findByBranchAndYear(branchId: string, year: string) {
    return this.repo.find({
      where: { branch_id: branchId, academic_year: year, is_deleted: false },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id, is_deleted: false } });
  }

  async update(id: string, dto: UpdateClassDto) {
    const result = await this.repo.update({ id, is_deleted: false }, dto);
    if (!(result.affected ?? 0)) return null;
    return this.findOne(id);
  }

  async softDelete(id: string) {
    const result = await this.repo.update(
      { id, is_deleted: false },
      { is_deleted: true, is_active: false },
    );
    return (result.affected ?? 0) > 0;
  }
  async findByYearLevel(yearLevelId: string) {
    return this.repo.find({
      where: { year_level_id: yearLevelId, is_deleted: false },
      order: { name: 'ASC' },
    });
  }
}
