import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission_module.entity';
import { PermissionModulesService } from './permission-modules.service';
import { PermissionModulesController } from './permission-modules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionModule])],
  controllers: [PermissionModulesController],
  providers: [PermissionModulesService],
})
export class PermissionModulesModule {}
