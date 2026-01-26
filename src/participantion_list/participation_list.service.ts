import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ParticipationList } from './participation_list.entity';
import { Class } from '../classes/class.entity';
import { CreateParticipationListDto } from './dto/create-participation-list.dto';
import { UpdateParticipationListDto } from './dto/update-participation-list.dto';

@Injectable()
export class ParticipationListService {
  constructor(
    @InjectRepository(ParticipationList)
    private participationRepo: Repository<ParticipationList>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateParticipationListDto): Promise<ParticipationList> {
    const classes = await this.classRepo.find({
      where: { id: In(dto.classIds) },
    });

    if (classes.length !== dto.classIds.length) {
      throw new BadRequestException('One or more class IDs do not exist');
    }

    const list = this.participationRepo.create({
      name: dto.name,
      score: dto.score,
      description: dto.description,
      classes,
    });

    return this.participationRepo.save(list);
  }

  async findAll(): Promise<ParticipationList[]> {
    return this.participationRepo.find({
      relations: ['classes'],
      order: { created_at: 'DESC' },
    });
  }

  async findByClassId(classId: string): Promise<ParticipationList[]> {
    return this.participationRepo
      .createQueryBuilder('list')
      .innerJoinAndSelect('list.classes', 'class')
      .where('class.id = :classId', { classId })
      .orderBy('list.created_at', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<ParticipationList> {
    const item = await this.participationRepo.findOne({
      where: { id },
      relations: ['classes'],
    });

    if (!item) {
      throw new NotFoundException(`Participation list ${id} not found`);
    }

    return item;
  }

  async update(id: string, dto: UpdateParticipationListDto): Promise<ParticipationList> {
    const list = await this.findOne(id);

    // Update basic fields
    if (dto.name !== undefined) list.name = dto.name;
    if (dto.score !== undefined) list.score = dto.score;
    if (dto.description !== undefined) list.description = dto.description;

    // Update classes if provided
    if (dto.classIds !== undefined) {
      if (dto.classIds.length === 0) {
        list.classes = [];
      } else {
        const classes = await this.classRepo.find({
          where: { id: In(dto.classIds) },
        });
        if (classes.length !== dto.classIds.length) {
          throw new BadRequestException('One or more class IDs do not exist');
        }
        list.classes = classes;
      }
    }

    return this.participationRepo.save(list);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.participationRepo.remove(item);
  }
}