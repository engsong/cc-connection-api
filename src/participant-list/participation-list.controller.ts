import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ParticipationListService } from './participation-list.service';
import { CreateParticipationListDto } from './dto/create-participation-list.dto';
import { UpdateParticipationListDto } from './dto/update-participation-list.dto';

@Controller('participation-list')
export class ParticipationListController {
  constructor(private readonly service: ParticipationListService) {}

  @Post()
  create(@Body() dto: CreateParticipationListDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateParticipationListDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
