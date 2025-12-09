import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YearLevel } from './year-level.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { randomUUID } from 'crypto';
import { CreateYearLevelDto } from './create-year-level.dto';
import { UpdateYearLevelDto } from './update-year-level.dto';

@Injectable()
export class YearLevelService {
  constructor(
    @InjectRepository(YearLevel)
    private repo: Repository<YearLevel>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,

    @InjectRepository(AcademicYear)
    private yearRepo: Repository<AcademicYear>,
  ) {}

  // -----------------------------
  // Create with validation
  // -----------------------------
  async create(dto: CreateYearLevelDto) {
    // Check branch exists
    const branch = await this.branchRepo.findOne({
      where: { id: dto.branch_id, is_deleted: false },
    });
    if (!branch) throw new NotFoundException('Branch not found');

    // Check academic year exists
    const academicYear = await this.yearRepo.findOne({
      where: { id: dto.academic_year_id, is_deleted: false },
    });
    if (!academicYear) throw new NotFoundException('Academic Year not found');

    const data = this.repo.create({
      id: randomUUID(),
      ...dto,
      created_at: new Date(),
    });
    return this.repo.save(data);
  }

  // -----------------------------
  // Get all (not deleted)
  // -----------------------------
  async findAll() {
    return this.repo.find({ where: { is_deleted: false } });
  }

  // -----------------------------
  // Get by ID
  // -----------------------------
  async findOne(id: string) {
    const year = await this.repo.findOne({ where: { id, is_deleted: false } });
    if (!year) throw new NotFoundException('Year Level not found');
    return year;
  }

  // -----------------------------
  // Get by branch_id
  // -----------------------------
  async findByBranch(branch_id: string) {
    return this.repo.find({ where: { branch_id, is_deleted: false } });
  }

  // -----------------------------
  // Update
  // -----------------------------
  async update(id: string, dto: UpdateYearLevelDto) {
    const existing = await this.findOne(id);

    // Optional: validate updated branch_id or academic_year_id
    if (dto.branch_id) {
      const branch = await this.branchRepo.findOne({
        where: { id: dto.branch_id, is_deleted: false },
      });
      if (!branch) throw new NotFoundException('Branch not found');
    }
    if (dto.academic_year_id) {
      const academicYear = await this.yearRepo.findOne({
        where: { id: dto.academic_year_id, is_deleted: false },
      });
      if (!academicYear) throw new NotFoundException('Academic Year not found');
    }

    const updated = {
      ...existing,
      ...dto,
      updated_at: new Date(),
    };
    return this.repo.save(updated);
  }

  // -----------------------------
  // Soft delete
  // -----------------------------
  async softDelete(id: string) {
    const year = await this.findOne(id);
    year.is_deleted = true;
    year.updated_at = new Date();
    return this.repo.save(year);
  }
}
