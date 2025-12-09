import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  @Post()
  create(@Body() body: CreateAdminDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAdminDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
  @Get('branch/:branchId')
  findByBranch(@Param('branchId') branchId: string) {
    return this.service.findByBranch(branchId);
  }
  @Post('by-branch')
  getByBranch(@Body() body: { branch_id: string }) {
    return this.service.findByBranch(body.branch_id);
  }
}
