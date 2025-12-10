import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /** CREATE COMMENT */
  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  /** GET ALL COMMENTS */
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  /** GET COMMENTS BY MODULE ID */
  @Get('module/:moduleId')
  findByModule(@Param('moduleId') moduleId: string) {
    return this.commentsService.findByModule(moduleId);
  }

  /** DELETE COMMENT */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
