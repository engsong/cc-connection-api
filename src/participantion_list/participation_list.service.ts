import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationList } from './participation_list.entity';
import { CreateParticipationListDto } from './dto/create-participation-list.dto';
import { UpdateParticipationListDto } from './dto/update-participation-list.dto';

@Injectable()
export class ParticipationListService {
  constructor(
    @InjectRepository(ParticipationList)
    private readonly participationRepo: Repository<ParticipationList>,
  ) {}

  async createParticipationList(dto: CreateParticipationListDto) {
    const item = this.participationRepo.create(dto);
    return this.participationRepo.save(item);
  }

  async getAllParticipationList() {
    return this.participationRepo.find();
  }

  async updateParticipationList(id: string, dto: UpdateParticipationListDto) {
  const item = await this.getParticipationListById(id); // id ต้องเป็น string
  Object.assign(item, dto);
  return this.participationRepo.save(item);
}

async deleteParticipationList(id: string) {
  const item = await this.getParticipationListById(id); // id ต้องเป็น string
  return this.participationRepo.remove(item);
}

// แก้ getParticipationListById ให้รับ string ด้วย
async getParticipationListById(id: string) {
  const item = await this.participationRepo.findOne({
    where: { id }, // id เป็น string
  });
  if (!item) throw new NotFoundException('Participation list item not found');
  return item;
}

}
