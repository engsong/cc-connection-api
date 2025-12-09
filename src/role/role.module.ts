import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Branch } from '../branch/branch.entity';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Branch])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RoleModule {}
