import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Class } from '../classes/class.entity';
import { Parent } from '../parents/parent.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Class, Parent, Role])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
