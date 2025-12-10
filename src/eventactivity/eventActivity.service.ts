import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventActivity } from './eventActivity.entity';
import { FileService } from '../file/file.service';
import { File } from '../file/files.entity';

@Injectable()
export class EventActivityService {
  constructor(
    @InjectRepository(EventActivity)
    private readonly activityRepo: Repository<EventActivity>,
    private readonly fileService: FileService,
  ) {}

  async create(
    data: Partial<EventActivity>,
    filePaths?: string[],
  ): Promise<EventActivity> {
    const newActivity = this.activityRepo.create(data);
    const savedActivity = await this.activityRepo.save(newActivity);

    if (filePaths && filePaths.length > 0) {
      for (const path of filePaths) {
        await this.fileService.create({
          module: 'event_activity',
          event_activity_id: savedActivity.id,
          file_path: path,
        } as Partial<File>);
      }
    }

    return savedActivity;
  }

  async findAll(): Promise<EventActivity[]> {
    return this.activityRepo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string): Promise<EventActivity> {
    const activity = await this.activityRepo.findOne({
      where: { id, is_deleted: false },
    });
    if (!activity) throw new NotFoundException('EventActivity not found');
    return activity;
  }

  async update(
    id: string,
    data: Partial<EventActivity>,
  ): Promise<EventActivity> {
    await this.findOne(id);
    await this.activityRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const activity = await this.findOne(id);
    activity.is_deleted = true;
    await this.activityRepo.save(activity);
    return { message: 'EventActivity deleted' };
  }
}
