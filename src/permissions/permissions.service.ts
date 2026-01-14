import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';
import { Admin } from '../admin/admin.entity';
import { Role } from '../role/role.entity';
import { PermissionModule } from '../permission_modules/permission_module.entity';
import { CreatePermissionDto } from '../permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '../permission/dto/update-permission.dto';
@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(PermissionModule)
    private readonly moduleRepo: Repository<PermissionModule>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreatePermissionDto) {
  const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
  const module = await this.moduleRepo.findOne({ where: { id: dto.permission_module_id } });
  const admin = dto.admin_id
    ? await this.adminRepo.findOne({ where: { id: dto.admin_id } })
    : undefined; // <-- ใช้ undefined แทน null

  if (!role) throw new NotFoundException('Role not found');
  if (!module) throw new NotFoundException('Permission module not found');

  const permission = this.permissionRepo.create({
    role: role as any,                    // <-- type assertion
    permission_module: module as any,     // <-- type assertion
    admin: admin as any,                  // <-- type assertion
    can_add: dto.can_add ?? false,
    can_view: dto.can_view ?? false,
    can_edit: dto.can_edit ?? false,
    can_update_password: dto.can_update_password ?? false,
    can_delete: dto.can_delete ?? false,
  });

  return this.permissionRepo.save(permission);
}


  async findAll() {
    return this.permissionRepo.find({
      relations: ['role', 'permission_module', 'admin'],
    });
  }

  async findOne(id: string) {
    const permission = await this.permissionRepo.findOne({
      where: { id },
      relations: ['role', 'permission_module', 'admin'],
    });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto) {
  const permission = await this.findOne(id);

  if (dto.role_id) {
    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new NotFoundException('Role not found');
    permission.role = role as any;  // <-- type assertion
  }

  if (dto.permission_module_id) {
    const module = await this.moduleRepo.findOne({ where: { id: dto.permission_module_id } });
    if (!module) throw new NotFoundException('Permission module not found');
    permission.permission_module = module as any; // <-- type assertion
  }

  if (dto.admin_id) {
    const admin = await this.adminRepo.findOne({ where: { id: dto.admin_id } });
    permission.admin = admin as any; // <-- type assertion, optional
  }

  permission.can_add = dto.can_add ?? permission.can_add;
  permission.can_view = dto.can_view ?? permission.can_view;
  permission.can_edit = dto.can_edit ?? permission.can_edit;
  permission.can_update_password = dto.can_update_password ?? permission.can_update_password;
  permission.can_delete = dto.can_delete ?? permission.can_delete;

  return this.permissionRepo.save(permission);
}


  async remove(id: string) {
    const permission = await this.findOne(id);
    return this.permissionRepo.remove(permission);
  }
}
