import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ParticipationScoreService } from './participation-score.service';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';

@Controller('participation-scores')
export class ParticipationScoreController {
  constructor(private readonly service: ParticipationScoreService) {}

  @Post()
  create(@Body() dto: CreateParticipationScoreDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateParticipationScoreDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }
}
