import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Branch } from '../branch/branch.entity';

import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Branch, Role])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
