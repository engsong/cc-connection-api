// participation-score.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ParticipationScoreService } from './participation-score.service';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';

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
  @Post('bulk-create')
  async bulkCreate(@Body() dto: CreateParticipationScoreDto) {
    return this.service.bulkCreate(dto);
  }

  /* ================= BULK UPSERT ================= */
  @Post('bulk-upsert')
  async bulkUpsert(@Body() dto: CreateParticipationScoreDto) {
    return this.service.bulkUpsert(dto);
  }

  /* ================= BULK UPDATE =================
     Optional: you can keep this if needed, but bulkUpsert covers create/update */
}