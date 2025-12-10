import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';
import { Admin } from '../admin/admin.entity';
import { ParticipationScore } from './participation_scores.entity';

@Injectable()
export class ParticipationScoreService {
  constructor(
    @InjectRepository(ParticipationScore)
    private repo: Repository<ParticipationScore>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,

    @InjectRepository(AcademicYear)
    private yearRepo: Repository<AcademicYear>,

    @InjectRepository(ParticipationList)
    private listRepo: Repository<ParticipationList>,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreateParticipationScoreDto) {
    const student = await this.studentRepo.findOneBy({ id: dto.student_id });
    if (!student) throw new NotFoundException('Student not found');

    const branch = await this.branchRepo.findOneBy({ id: dto.branch_id });
    if (!branch) throw new NotFoundException('Branch not found');

    const year = await this.yearRepo.findOneBy({ id: dto.academic_year_id });
    if (!year) throw new NotFoundException('Academic year not found');

    const list = await this.listRepo.findOneBy({
      id: dto.participation_list_id,
    });
    if (!list) throw new NotFoundException('Participation list not found');

    const admin = await this.adminRepo.findOneBy({ id: dto.added_by_admin_id });
    if (!admin) throw new NotFoundException('Admin not found');

    const participationScore = this.repo.create({
      student,
      branch,
      academic_year: year,
      participation_list: list,
      added_by: admin,
      score: dto.score,
      date: dto.date ?? null,
    });

    return await this.repo.save(participationScore);
  }

  async findAll() {
    return this.repo.find({
      relations: [
        'student',
        'branch',
        'academic_year',
        'participation_list',
        'added_by',
      ],
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({
      where: { id },
      relations: [
        'student',
        'branch',
        'academic_year',
        'participation_list',
        'added_by',
      ],
    });

    if (!found) throw new NotFoundException('Participation score not found');

    return found;
  }

  async update(id: string, dto: UpdateParticipationScoreDto) {
    const participationScore = await this.findOne(id);

    if (dto.student_id) {
      const student = await this.studentRepo.findOneBy({ id: dto.student_id });
      if (!student) throw new NotFoundException('Student not found');
      participationScore.student = student;
    }

    if (dto.branch_id) {
      const branch = await this.branchRepo.findOneBy({ id: dto.branch_id });
      if (!branch) throw new NotFoundException('Branch not found');
      participationScore.branch = branch;
    }

    if (dto.academic_year_id) {
      const year = await this.yearRepo.findOneBy({ id: dto.academic_year_id });
      if (!year) throw new NotFoundException('Academic year not found');
      participationScore.academic_year = year;
    }

    if (dto.participation_list_id) {
      const list = await this.listRepo.findOneBy({
        id: dto.participation_list_id,
      });
      if (!list) throw new NotFoundException('Participation list not found');
      participationScore.participation_list = list;
    }

    if (dto.added_by_admin_id) {
      const admin = await this.adminRepo.findOneBy({
        id: dto.added_by_admin_id,
      });
      if (!admin) throw new NotFoundException('Admin not found');
      participationScore.added_by = admin;
    }

    if (dto.score !== undefined) participationScore.score = dto.score;
    if (dto.date !== undefined) participationScore.date = dto.date;

    return await this.repo.save(participationScore);
  }

  async delete(id: string) {
    const score = await this.findOne(id);
    return this.repo.remove(score);
  }
}
