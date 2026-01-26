import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';
import { Branch } from '../branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Branch])],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [
    ClassesService,
    TypeOrmModule.forFeature([Class]),      // ← add this (or just TypeOrmModule)
    // If you also need Branch repository in other modules later, add:
    // TypeOrmModule.forFeature([Branch]),
  ],
})
export class ClassesModule {}