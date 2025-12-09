import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PermissionModulesService } from './permission-modules.service';
import { CreatePermissionModuleDto } from './dot/create-permission-module.dto';

@Controller('permission-modules')
export class PermissionModulesController {
  constructor(private service: PermissionModulesService) {}

  @Post()
  create(@Body() dto: CreatePermissionModuleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreatePermissionModuleDto>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
