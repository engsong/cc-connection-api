import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teaching } from './teaching.entity';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { CreateTeachingDto } from './dto/create-teaching.dto';
import { UpdateTeachingDto } from './dto/update-teaching.dto';
import { Class } from '../classes/class.entity';
import { Subject } from '../subjects/subject.entity';

@Injectable()
export class TeachingService {
  constructor(
    @InjectRepository(Teaching)
    private readonly teachingRepo: Repository<Teaching>,

    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,

    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateTeachingDto) {
  const branch = await this.branchRepo.findOne({
    where: { id: String(dto.branch_id) },
  });
  if (!branch) throw new NotFoundException('Branch not found');

  const teacher = await this.adminRepo.findOne({
    where: { id: dto.teacher_id }, // admin เป็น uuid → ใช้ string
  });
  if (!teacher) throw new NotFoundException('Teacher not found');

  const cls = await this.classRepo.findOne({
    where: { id: String(dto.class_id) },
  });
  if (!cls) throw new NotFoundException('Class not found');

  const subject = await this.subjectRepo.findOne({
    where: { id: Number(dto.subject_id) },
  });
  if (!subject) throw new NotFoundException('Subject not found');

  const teaching = this.teachingRepo.create({
    academic_year: dto.academic_year,
    branch,
    teacher,
    class: cls,
    subject,
    time_table: dto.time_table,
  });

  return this.teachingRepo.save(teaching);
}


  async findAll() {
    return this.teachingRepo.find({
      relations: ['branch', 'teacher', 'class', 'subject'],
    });
  }

  async findOne(id: string) {
    const teaching = await this.teachingRepo.findOne({
      where: { id },
      relations: ['branch', 'teacher', 'class', 'subject'],
    });
    if (!teaching) throw new NotFoundException('Teaching not found');
    return teaching;
  }

  async update(id: string, dto: UpdateTeachingDto) {
  const teaching = await this.findOne(id);

  if (dto.branch_id !== undefined) {
    const branch = await this.branchRepo.findOne({
      where: { id: String(dto.branch_id) },
    });
    if (!branch) throw new NotFoundException('Branch not found');
    teaching.branch = branch;
  }

  if (dto.teacher_id !== undefined) {
    const teacher = await this.adminRepo.findOne({
      where: { id: dto.teacher_id }, // uuid → string
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    teaching.teacher = teacher;
  }

  if (dto.class_id !== undefined) {
    const cls = await this.classRepo.findOne({
      where: { id: String(dto.class_id) },
    });
    if (!cls) throw new NotFoundException('Class not found');
    teaching.class = cls;
  }

  if (dto.subject_id !== undefined) {
    const subject = await this.subjectRepo.findOne({
      where: { id: Number(dto.subject_id) },
    });
    if (!subject) throw new NotFoundException('Subject not found');
    teaching.subject = subject;
  }

  teaching.academic_year = dto.academic_year ?? teaching.academic_year;
  teaching.time_table = dto.time_table ?? teaching.time_table;

  return this.teachingRepo.save(teaching);
}


  async remove(id: string) {
    const teaching = await this.findOne(id);
    return this.teachingRepo.remove(teaching);
  }
}
