import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationList } from './participation-list.entity';
import { CreateParticipationListDto } from './dto/create-participation-list.dto';
import { UpdateParticipationListDto } from './dto/update-participation-list.dto';

@Injectable()
export class ParticipationListService {
  constructor(
    @InjectRepository(ParticipationList)
    private repo: Repository<ParticipationList>,
  ) {}

  create(dto: CreateParticipationListDto) {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateParticipationListDto) {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new Error('Participation list not found');
    Object.assign(entry, dto);
    return this.repo.save(entry);
  }

  async remove(id: string) {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new Error('Participation list not found');
    return this.repo.remove(entry);
  }
}
