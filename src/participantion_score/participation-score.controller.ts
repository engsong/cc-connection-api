import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ParticipationScoreService } from './participation-score.service';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';
import { Admin } from '../admin/admin.entity';

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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /* ================= CREATE ================= */
  @Post()
  async create(
    @Body() dto: CreateParticipationScoreDto,
  ) {
    return this.service.create(dto);
  }

  /* ================= UPDATE ================= */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParticipationScoreDto,
  ) {
    return this.service.update(id, dto);
  }

  /* ================= DELETE ================= */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
