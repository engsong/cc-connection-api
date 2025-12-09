import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/CreateParentDto';
import { UpdateParentDto } from './dto/UpdateParentDto';

@Controller('parents')
export class ParentController {
  constructor(private readonly service: ParentService) {}

  @Post()
  create(@Body() dto: CreateParentDto) {
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

  @Get('branch/:branch_id')
  findByBranch(@Param('branch_id') branch_id: string) {
    return this.service.findByBranch(branch_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
