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
      branchId: dto.branchId,
      academicYearId: dto.academicYearId,
      classId: dto.classId,
      addedBy: dto.addedBy,
      ...(dto.date ? { date: new Date(dto.date) } : {}),
      scores: dto.scores.map((s) => ({
        studentId: s.studentId,
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
  async findOne(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');
    return record;
  }

  /* ================= UPDATE ================= */
  async update(id: string, dto: UpdateParticipationScoreDto) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');

    if (dto.branchId) record.branchId = dto.branchId;
    if (dto.academicYearId) record.academicYearId = dto.academicYearId;
    if (dto.classId) record.classId = dto.classId;
    if (dto.date) record.date = new Date(dto.date);
    if (dto.addedBy) record.addedBy = dto.addedBy;

    if (dto.scores) {
      record.scores = dto.scores.map((s) => ({
        studentId: s.studentId,
        participationId: s.id,
        participationName: s.name,
        score: s.score,
      }));
    }

    return this.repo.save(record);
  }

  /* ================= DELETE ================= */
  async remove(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Participation score not found');
    await this.repo.remove(record);
    return { message: 'Deleted successfully' };
  }

  /* ================= BULK UPSERT ================= */
  async bulkUpsert(dto: CreateParticipationScoreDto) {
    // Check if a ParticipationScore for this class + branch + year + date already exists
    const existing = await this.repo.findOne({
      where: {
        classId: dto.classId,
        branchId: dto.branchId,
        academicYearId: dto.academicYearId,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });

    if (existing) {
      // Update existing scores or add new ones
      dto.scores.forEach((s) => {
        const idx = existing.scores.findIndex(
          (sc) => sc.participationId === s.id && sc.studentId === s.studentId,
        );
        if (idx >= 0) {
          existing.scores[idx].score = s.score; // update
        } else {
          existing.scores.push({
            studentId: s.studentId,
            participationId: s.id,
            participationName: s.name,
            score: s.score,
          }); // add new
        }
      });
      return this.repo.save(existing);
    } else {
      // Create a new ParticipationScore record
      const entity = this.repo.create({
        branchId: dto.branchId,
        academicYearId: dto.academicYearId,
        classId: dto.classId,
        date: dto.date ? new Date(dto.date) : undefined,
        addedBy: dto.addedBy,
        scores: dto.scores.map((s) => ({
          studentId: s.studentId,
          participationId: s.id,
          participationName: s.name,
          score: s.score,
        })),
      });
      return this.repo.save(entity);
    }
  }

  /* ================= BULK CREATE ================= */
  async bulkCreate(dto: CreateParticipationScoreDto) {
    const entity = this.repo.create({
      branchId: dto.branchId,
      academicYearId: dto.academicYearId,
      classId: dto.classId,
      date: dto.date ? new Date(dto.date) : undefined,
      addedBy: dto.addedBy,
      scores: dto.scores.map((s) => ({
        studentId: s.studentId,
        participationId: s.id,
        participationName: s.name,
        score: s.score,
      })),
    });
    return this.repo.save(entity);
  }
}