import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionModule } from './permission-module.entity';
import { CreatePermissionModuleDto } from './dot/create-permission-module.dto';

@Injectable()
export class PermissionModulesService {
  constructor(
    @InjectRepository(PermissionModule)
    private repo: Repository<PermissionModule>,
  ) {}

  // CREATE
  create(dto: CreatePermissionModuleDto) {
    const module = this.repo.create(dto);
    return this.repo.save(module);
  }

  // GET ALL
  findAll() {
    return this.repo.find();
  }

  // GET BY ID
  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  //Update
  async update(id: string, dto: Partial<CreatePermissionModuleDto>) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  // Delete
  async delete(id: string) {
    const module = await this.findById(id);
    if (module) {
      await this.repo.remove(module);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
