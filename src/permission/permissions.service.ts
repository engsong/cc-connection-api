import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Role } from '../role/role.entity';
import { PermissionModule } from '../permission-module/permission-module.entity';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private repo: Repository<Permission>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(PermissionModule)
    private moduleRepo: Repository<PermissionModule>,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  // CREATE
  async create(dto: CreatePermissionDto) {
    const permission = new Permission();

    permission.role = await this.roleRepo.findOneByOrFail({ id: dto.role_id });
    permission.permissionModule = await this.moduleRepo.findOneByOrFail({
      id: dto.permission_module_id,
    });
    permission.admin = await this.adminRepo.findOneByOrFail({
      id: dto.admin_id,
    });

    permission.can_add = dto.can_add ?? false;
    permission.can_view = dto.can_view ?? false;
    permission.can_edit = dto.can_edit ?? false;
    permission.can_update_password = dto.can_update_password ?? false;
    permission.can_delete = dto.can_delete ?? false;

    return this.repo.save(permission);
  }

  // GET ALL
  findAll() {
    return this.repo.find({
      relations: ['role', 'permissionModule', 'admin'],
    });
  }

  // GET BY ID
  async findById(id: string) {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['role', 'permissionModule', 'admin'],
    });
    if (!data) throw new NotFoundException('Permission not found');
    return data;
  }

  // UPDATE
  async update(id: string, dto: UpdatePermissionDto) {
    const permission = await this.findById(id);

    if (dto.role_id) {
      permission.role = await this.roleRepo.findOneByOrFail({
        id: dto.role_id,
      });
    }

    if (dto.permission_module_id) {
      permission.permissionModule = await this.moduleRepo.findOneByOrFail({
        id: dto.permission_module_id,
      });
    }

    if (dto.admin_id) {
      permission.admin = await this.adminRepo.findOneByOrFail({
        id: dto.admin_id,
      });
    }

    Object.assign(permission, dto);

    return this.repo.save(permission);
  }

  // DELETE
  async delete(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Not found');
    return { deleted: true };
  }
}
