import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private repo: Repository<Class>,
  ) {}

  // Create new class
  async create(dto: CreateClassDto) {
    const cls = this.repo.create({
      id: randomUUID().replace(/-/g, '').slice(0, 24),
      ...dto,
      saving_wallet: dto.saving_wallet || '0.00',
      is_deleted: false,
      is_active: dto.is_active ?? true,
      created_at: new Date(),
    });
    return this.repo.save(cls);
  }

  // Get all classes (not deleted)
  async findAll() {
    return this.repo.find({
      where: { is_deleted: false },
      order: { name: 'ASC' },
      relations: ['branch', 'academicYear', 'yearLevel'], // include relations
    });
  }

  // Get class by ID
  async findOne(id: string) {
    const cls = await this.repo.findOne({
      where: { id, is_deleted: false },
      relations: ['branch', 'academicYear', 'yearLevel'],
    });
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  // Get classes by branch
  async findByBranch(branchId: string) {
    return this.repo.find({
      where: { branch_id: branchId, is_deleted: false },
      order: { name: 'ASC' },
      relations: ['branch', 'academicYear', 'yearLevel'],
    });
  }

  // Get classes by academic year
  async findByAcademicYear(yearId: string) {
    return this.repo.find({
      where: { academic_year_id: yearId, is_deleted: false },
      order: { name: 'ASC' },
      relations: ['branch', 'academicYear', 'yearLevel'],
    });
  }

  // Get classes by branch + academic year
  async findByBranchAndYear(branchId: string, yearId: string) {
    return this.repo.find({
      where: {
        branch_id: branchId,
        academic_year_id: yearId,
        is_deleted: false,
      },
      order: { name: 'ASC' },
      relations: ['branch', 'academicYear', 'yearLevel'],
    });
  }

  // Get classes by year level
  async findByYearLevel(yearLevelId: string) {
    return this.repo.find({
      where: { year_level_id: yearLevelId, is_deleted: false },
      order: { name: 'ASC' },
      relations: ['branch', 'academicYear', 'yearLevel'],
    });
  }

  // Update class
  async update(id: string, dto: UpdateClassDto) {
    const cls = await this.findOne(id);
    Object.assign(cls, dto, { updated_at: new Date() });
    return this.repo.save(cls);
  }

  // Soft delete class
  async softDelete(id: string) {
    const cls = await this.findOne(id);
    cls.is_deleted = true;
    cls.is_active = false;
    cls.updated_at = new Date();
    await this.repo.save(cls);
    return true;
  }

  async findOneWithRelations(id: string) {
  const cls = await this.repo.findOne({
    where: { id },
    relations: ['students', 'participationLists', 'branch', 'academicYear', 'yearLevel'],
  });

  if (!cls) {
    throw new NotFoundException(`Class with ID ${id} not found`);
  }

  return cls;
}
}
