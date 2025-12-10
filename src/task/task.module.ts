import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { FileModule } from '../file/file.module';
import { File } from '../file/files.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Task, File]), FileModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
