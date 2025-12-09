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

  // POST /year-levels
  @Post()
  create(@Body() dto: CreateYearLevelDto) {
    return this.service.create(dto);
  }

  // GET /year-levels
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /year-levels/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // GET /year-levels/branch/:branch_id
  @Get('branch/:branch_id')
  findByBranch(@Param('branch_id') branch_id: string) {
    return this.service.findByBranch(branch_id);
  }

  // PUT /year-levels/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateYearLevelDto) {
    return this.service.update(id, dto);
  }

  // DELETE /year-levels/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
