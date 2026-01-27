// participation-score.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ParticipationScoreService } from './participation-score.service';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';
import { Between } from 'typeorm';
import { query } from 'winston';

export interface ScoreResult {
  studentId: string;
  studentName: string;
  participationId: string;
  participationName: string;
  score: number;
}


@Controller('participation-scores')
export class ParticipationScoreController {
  constructor(private readonly service: ParticipationScoreService) {}

  
  /* ================= GET ALL ================= */
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  /* ================= GET BY ID ================= */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /* ================= CREATE ================= */
  @Post()
  async create(@Body() dto: CreateParticipationScoreDto) {
    return this.service.create(dto);
  }

  /* ================= UPDATE ================= */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateParticipationScoreDto,
  ) {
    return this.service.update(id, dto);
  }

  /* ================= DELETE ================= */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  /* ================= BULK CREATE ================= */
  /* ================= BULK UPSERT ================= */
  @Post('bulk-upsert')
  async bulkUpsert(@Body() dto: CreateParticipationScoreDto) {
    return this.service.bulkUpsert(dto);
  }

  // Controller
  @Post('filter')
async filterData(@Body() body: { branchId: string; academicYearId: string; classId: string; date: string }): Promise<ScoreResult[]> {
  const result = await this.service.getScoresByFilter({
    branchId: body.branchId,
    academicYearId: body.academicYearId,
    classId: body.classId,
    date: new Date(body.date),
  });

  return result;
}

}
