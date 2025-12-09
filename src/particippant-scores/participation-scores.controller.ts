import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ParticipationScoresService } from './participation-scores.service';
import { CreateParticipationScoreDto } from './dto/create-participation-score.dto';
import { UpdateParticipationScoreDto } from './dto/update-participation-score.dto';

@Controller('participation-scores')
export class ParticipationScoresController {
  constructor(private readonly service: ParticipationScoresService) {}

  @Post()
  create(@Body() body: CreateParticipationScoreDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.service.findByStudent(studentId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateParticipationScoreDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
  @Post('student')
  getByStudentCode(@Body('student_id') studentId: string) {
    return this.service.getByStudentCode(studentId);
  }
}
