import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = this.repo.create(dto); // FIXED
    return await this.repo.save(comment);
  }

  async findAll() {
    return await this.repo.find({
      order: { created_at: 'DESC' }, // FIXED
    });
  }

  async findByModule(module_id: string) {
    return await this.repo.find({
      where: { module_id }, // FIXED — must match entity field
      order: { created_at: 'DESC' },
    });
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
