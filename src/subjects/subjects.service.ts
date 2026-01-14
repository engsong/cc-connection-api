import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Branch } from '../branch/branch.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  async create(dto: CreateSubjectDto) {
    const branch = await this.branchRepo.findOne({
      where: {
        branch_id: String(dto.branch_id), // ✅ แปลงเป็น string
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const subject = this.subjectRepo.create({
      name: dto.name,
      branch,
    });

    return this.subjectRepo.save(subject);
  }

  findAll() {
    return this.subjectRepo.find({
      relations: ['branch'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({
      where: { id },
      relations: ['branch'],
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    return this.subjectRepo.remove(subject);
  }
}
