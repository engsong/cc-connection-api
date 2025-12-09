import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationScore } from './participation_scores.entity';
import { Student } from '../students/student.entity';
import { Branch } from '../branch/branch.entity';
import { AcademicYear } from '../academic_years/academic.entity';
import { ParticipationList } from '../participant-list/participation-list.entity';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';

@Injectable()
export class ParticipationScoresService {
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
  ) {}

  async create(dto: CreateParticipationScoreDto) {
    const score = new ParticipationScore();

    score.student = await this.studentRepo.findOneByOrFail({
      id: dto.studentId,
    });
    score.branch = await this.branchRepo.findOneByOrFail({ id: dto.branchId });
    score.academic_year = await this.yearRepo.findOneByOrFail({
      id: dto.academicYearId,
    });
    score.participation_list = await this.listRepo.findOneByOrFail({
      id: dto.participationListId,
    });

    // Handle optional values safely
    score.date = dto.date ?? null; // if date is optional, entity column should allow null
    score.score = dto.score ?? 0;
    score.added_by = dto.addedBy ?? ''; // or throw an error if addedBy is required

    return this.repo.save(score);
  }

  findAll() {
    return this.repo.find({
      relations: ['student', 'branch', 'academic_year', 'participation_list'],
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['student', 'branch', 'academic_year', 'participation_list'],
    });
  }

  async update(id: string, dto: UpdateParticipationScoreDto) {
    const score = await this.repo.findOne({ where: { id } });
    if (!score) throw new Error('Participation Score not found');

    Object.assign(score, dto);

    if (dto.student_id)
      score.student = await this.studentRepo.findOneByOrFail({
        id: dto.student_id,
      });
    if (dto.branch_id)
      score.branch = await this.branchRepo.findOneByOrFail({
        id: dto.branch_id,
      });
    if (dto.academic_year_id)
      score.academic_year = await this.yearRepo.findOneByOrFail({
        id: dto.academic_year_id,
      });
    if (dto.participation_list_id)
      score.participation_list = await this.listRepo.findOneByOrFail({
        id: dto.participation_list_id,
      });

    return this.repo.save(score);
  }

  async remove(id: string) {
    const score = await this.repo.findOne({ where: { id } });
    if (!score) throw new Error('Participation Score not found');
    return this.repo.remove(score);
  }

  // Optional: get by student
  findByStudent(studentId: string) {
    return this.repo.find({
      where: { student: { id: studentId } },
      relations: ['student', 'branch', 'academic_year', 'participation_list'],
    });
  }

  async getByStudentCode(studentCode: string) {
    const student = await this.studentRepo.findOne({
      where: { student_id: studentCode },
    });
    if (!student) return [];
    return this.repo.find({
      where: { student: { id: student.id } },
      relations: ['student', 'branch', 'academic_year', 'participation_list'],
    });
  }
}
