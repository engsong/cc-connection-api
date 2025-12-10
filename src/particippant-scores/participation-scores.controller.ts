import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';
import { ParticipationScoreService } from './participation-scores.service';

@Controller('participation-scores')
export class ParticipationScoreController {
  constructor(private readonly service: ParticipationScoreService) {}

  // CREATE participation score
  @Post()
  create(@Body() dto: CreateParticipationScoreDto) {
    return this.service.create(dto);
  }

  // GET all participation scores
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET single participation score by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE participation score
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParticipationScoreDto) {
    return this.service.update(id, dto);
  }

  // DELETE participation score
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
