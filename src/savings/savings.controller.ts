import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { SavingService } from './savings.service';

@Controller('savings')
export class SavingsController {
  constructor(private readonly service: SavingService) {}

  // ================= CREATE =================
  @Post()
  create(@Body() body: CreateSavingDto) {
    return this.service.createSaving(body);
  }

  // ================= GET ALL =================
  @Get()
  findAll() {
    return this.service.getAllSavings();
  }

  // ================= GET BY ID =================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getSavingById(id);
  }

  // ================= UPDATE =================
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateSavingDto) {
    return this.service.updateSaving(id, body);
  }

  // ================= DELETE =================
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteSaving(id);
  }

  // Get savings by student ID
  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.service.getSavingsByStudentId(studentId);
  }
}
