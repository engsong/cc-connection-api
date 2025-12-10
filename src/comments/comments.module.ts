import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Admin } from '../admin/admin.entity';
import { Parent } from '../parents/parent.entity';
import { Comment } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Admin, Parent])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
