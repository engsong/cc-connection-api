import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './parent.entity';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Branch } from '../branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, Branch])], // Parent depends on Branch
  providers: [ParentService],
  controllers: [ParentController],
  exports: [ParentService], // Export if used in other modules
})
export class ParentModule {}
