import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { Role } from './role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Branch, Admin]), // <-- include Admin here
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
