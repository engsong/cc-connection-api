import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationScore } from './participation-score.entity';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participantion_list/participation-list.entity';

@Injectable()
export class ParticipationScoreService {
  constructor(
    @InjectRepository(ParticipationScore)
    private readonly participationScoreRepo: Repository<ParticipationScore>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
    @InjectRepository(AcademicYear)
    private readonly academicYearRepo: Repository<AcademicYear>,
    @InjectRepository(ParticipationList)
    private readonly participationListRepo: Repository<ParticipationList>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreateParticipationScoreDto) {
    const student = await this.studentRepo.findOne({
      where: { id: String(dto.student_id) },
    });
    const branch = await this.branchRepo.findOne({
      where: { id: String(dto.branch_id) },
    });
    const academicYear = await this.academicYearRepo.findOne({
      where: { id: String(dto.academic_year_id) },
    });
    const participationList = await this.participationListRepo.findOne({
      where: { id: String(dto.participation_list_id) }, // ต้องใช้ Number()
    });

    const admin = await this.adminRepo.findOne({
      where: { id: String(dto.added_by) },
    });

    if (!student || !branch || !academicYear || !participationList || !admin) {
      throw new NotFoundException('Related entity not found');
    }

    const participationScore = this.participationScoreRepo.create({
      student,
      branch,
      academic_year: academicYear,
      date: dto.date,
      participation_list: participationList,
      score: dto.score,
      added_by: admin,
    });

    return this.participationScoreRepo.save(participationScore);
  }

  async findAll() {
    return this.participationScoreRepo.find({
      relations: [
        'student',
        'branch',
        'academic_year',
        'participation_list',
        'added_by',
      ],
    });
  }

  async findOne(id: number) {
    const score = await this.participationScoreRepo.findOne({
      where: { id },
      relations: [
        'student',
        'branch',
        'academic_year',
        'participation_list',
        'added_by',
      ],
    });
    if (!score) throw new NotFoundException('Participation score not found');
    return score;
  }

  async update(id: number, dto: UpdateParticipationScoreDto) {
    const score = await this.findOne(id);

    if (dto.student_id) {
      const student = await this.studentRepo.findOne({
        where: { id: String(dto.student_id) },
      });
      if (!student)
        throw new NotFoundException(
          `Student with id ${dto.student_id} not found`,
        );
      score.student = student;
    }

    if (dto.branch_id) {
      const branch = await this.branchRepo.findOne({
        where: { id: String(dto.branch_id) },
      });
      if (!branch)
        throw new NotFoundException(
          `Branch with id ${dto.branch_id} not found`,
        );
      score.branch = branch;
    }

    if (dto.academic_year_id) {
      const academicYear = await this.academicYearRepo.findOne({
        where: { id: String(dto.academic_year_id) },
      });
      if (!academicYear)
        throw new NotFoundException(
          `AcademicYear with id ${dto.academic_year_id} not found`,
        );
      score.academic_year = academicYear;
    }

    if (dto.participation_list_id) {
      const list = await this.participationListRepo.findOne({
        where: { id: String(dto.participation_list_id) }, // string type
      });
      if (!list)
        throw new NotFoundException(
          `ParticipationList with id ${dto.participation_list_id} not found`,
        );
      score.participation_list = list;
    }

    if (dto.added_by) {
      const admin = await this.adminRepo.findOne({
        where: { id: String(dto.added_by) },
      });
      if (!admin)
        throw new NotFoundException(`Admin with id ${dto.added_by} not found`);
      score.added_by = admin;
    }

    if (dto.date) score.date = dto.date;
    if (dto.score !== undefined) score.score = dto.score;

    return this.participationScoreRepo.save(score);
  }

  async remove(id: number) {
    const score = await this.findOne(id);
    return this.participationScoreRepo.remove(score);
  }
}
