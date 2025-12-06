import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './create-academic-year.dto';
import { UpdateAcademicYearDto } from './update-academic-year.dto';
@Controller('academic-year')
export class AcademicYearController {
  constructor(private service: AcademicYearService) {}

  @Post()
  create(@Body() dto: CreateAcademicYearDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAcademicYearDto) {
    return this.service.update(id, dto);
  }
}
