import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ParticipationListService } from './participation-list.service';
import { CreateParticipationListDto } from './dto/create-participation-list.dto';
import { UpdateParticipationListDto } from './dto/update-participation-list.dto';

@Controller('participation-list')
export class ParticipationListController {
  constructor(private readonly participationService: ParticipationListService) {}

  @Post()
  create(@Body() dto: CreateParticipationListDto) {
    return this.participationService.createParticipationList(dto);
  }

  @Get()
  findAll() {
    return this.participationService.getAllParticipationList();
  }

@Get(':id')
findOne(@Param('id') id: string) {  // <-- แก้เป็น string
  return this.participationService.getParticipationListById(id);
}

@Put(':id')
update(@Param('id') id: string, @Body() dto: UpdateParticipationListDto) {  // <-- string
  return this.participationService.updateParticipationList(id, dto);
}

@Delete(':id')
remove(@Param('id') id: string) {  // <-- string
  return this.participationService.deleteParticipationList(id);
}

}
