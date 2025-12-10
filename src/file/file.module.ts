import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files.entity';
import { Event } from '../event/events.entity';
import { EventActivity } from '../eventactivity/eventActivity.entity';
import { Task } from '../task/task.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File, Event, EventActivity, Task])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
