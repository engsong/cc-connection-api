import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationScore } from './participation-score.entity';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';

@Injectable()
export class ParticipationScoreService {
  constructor(
    @InjectRepository(ParticipationScore)
    private readonly repo: Repository<ParticipationScore>,
  ) {}

  /* ================= CREATE ================= */
  async create(dto: CreateParticipationScoreDto) {
    const entity = this.repo.create({
      branchId: Number(dto.branchId),
      academicYearId: Number(dto.academicYearId),
      addedBy: dto.addedBy,
      scores: dto.scores.map(s => ({
        participationId: s.id,
        participationName: s.name,
        score: s.score,
      })),
    });

    return this.repo.save(entity);
  }

  /* ================= GET ALL ================= */
  async findAll() {
    return this.repo.find({
      order: { created_at: 'DESC' },
    });
  }

  /* ================= GET BY ID ================= */
  async findOne(id: number) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');
    return record;
  }

  /* ================= UPDATE ================= */
  async update(id: number, dto: UpdateParticipationScoreDto) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');

    if (dto.branch_id !== undefined) record.branchId = Number(dto.branch_id);
    if (dto.academic_year_id !== undefined) record.academicYearId = Number(dto.academic_year_id);
    if (dto.date) record.created_at = new Date(dto.date);
    if (dto.added_by) record.addedBy = String(dto.added_by);

    if (dto.scores) {
      record.scores = dto.scores.map(s => ({
        participationId: s.id,
        participationName: s.name,
        score: s.score,
      }));
    }

    return this.repo.save(record);
  }

  /* ================= DELETE ================= */
  async remove(id: number) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');
    await this.repo.remove(record);
    return { message: 'Deleted successfully' };
  }
}
