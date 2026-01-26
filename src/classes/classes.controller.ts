import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateClassDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('branch_id') branchId?: string,
    @Query('academic_year') academicYear?: string,
    @Query('year_level_id') yearLevelId?: string,
  ) {
    if (yearLevelId) {
      return this.service.findByYearLevel(yearLevelId);
    }
    if (branchId && academicYear) {
      return this.service.findByBranchAndYear(branchId, academicYear);
    }
    if (branchId) return this.service.findByBranch(branchId);
    if (academicYear) return this.service.findByAcademicYear(academicYear);

    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cls = await this.service.findOne(id);
    if (!cls) throw new NotFoundException(`Class with ID ${id} not found`);
    return cls;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException(`Class with ID ${id} not found`);
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string) {
    const deleted = await this.service.softDelete(id);
    if (!deleted) throw new NotFoundException(`Class with ID ${id} not found`);
  }

  @Post('by-class-id')
async getByClassIdWithDetails(@Param('classId', ParseUUIDPipe) classId: string) {
  const cls = await this.service.findOneWithRelations(classId);
  if (!cls) {
    throw new NotFoundException(`Class with ID ${classId} not found`);
  }
  return cls;
}
}
