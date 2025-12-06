import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { YearLevelService } from './year-level.service';
import { CreateYearLevelDto } from './create-year-level.dto';
import { UpdateYearLevelDto } from './update-year-level.dto';

@Controller('year-levels')
export class YearLevelController {
  constructor(private service: YearLevelService) {}

  @Post()
  create(@Body() dto: CreateYearLevelDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateYearLevelDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
