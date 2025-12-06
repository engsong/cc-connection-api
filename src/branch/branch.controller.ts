import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './create-branch.dto';
import { UpdateBranchDto } from './update-branch.dto';

@Controller('branches')
export class BranchController {
  constructor(private service: BranchService) {}

  @Post()
  create(@Body() dto: CreateBranchDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
