import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.entity'; // <-- import Comment ถูกต้อง
import { Admin } from '../admin/admin.entity';
import { Parent } from '../parents/parent.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Admin, Parent, Task, Event]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
