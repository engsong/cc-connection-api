import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.entity';
import { Admin } from '../admin/admin.entity';
import { Parent } from '../parents/parent.entity';
import { Task } from '../task/task.entity';
import { EventActivity } from '../eventactivity/eventActivity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Admin, Parent, Task, Event, EventActivity]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
