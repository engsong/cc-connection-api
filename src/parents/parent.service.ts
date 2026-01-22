import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './parent.entity';
import { CreateParentDto } from './dto/CreateParentDto';
import { UpdateParentDto } from './dto/UpdateParentDto';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private readonly repo: Repository<Parent>,
  ) {}

  async create(dto: CreateParentDto, files?: Express.Multer.File[]): Promise<Parent> {
    const parent = this.repo.create(dto);

    if (files?.length) {
      for (const file of files) {
        if (file.fieldname === 'profile_pic') parent.profile_pic = file.path;
        if (file.fieldname === 'id_card') parent.id_card = file.path;
      }
    }

    return this.repo.save(parent);
  }

  async update(id: string, dto: UpdateParentDto, files?: Express.Multer.File[]): Promise<Parent> {
    const parent = await this.repo.findOne({ where: { id } });
    if (!parent) throw new NotFoundException('Parent not found');

    Object.assign(parent, dto);

    if (files?.length) {
      for (const file of files) {
        if (file.fieldname === 'profile_pic') parent.profile_pic = file.path;
        if (file.fieldname === 'id_card') parent.id_card = file.path;
      }
    }

    return this.repo.save(parent);
  }

  findAll(): Promise<Parent[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Parent> {
    const parent = await this.repo.findOne({ where: { id } });
    if (!parent) throw new NotFoundException('Parent not found');
    return parent;
  }

  findByBranch(branch_id: string): Promise<Parent[]> {
    return this.repo.find({ where: { branch_id } });
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const parent = await this.findOne(id);
    parent.is_deleted = true;
    await this.repo.save(parent);
    return { message: 'Parent soft deleted' };
  }
}
