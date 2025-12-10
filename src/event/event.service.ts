import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity'; // lowercase folder name
import { File } from '../file/files.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    private readonly fileService: FileService,
  ) {}

  // Create event with optional files
  async create(data: Partial<Event>, filePaths?: string[]): Promise<Event> {
    const newEvent = this.eventRepo.create(data);
    const savedEvent = await this.eventRepo.save(newEvent);

    if (filePaths?.length) {
      const files: Partial<File>[] = filePaths.map((path) => ({
        module: 'event',
        event_id: savedEvent.id,
        file_path: path,
      }));

      for (const f of files) {
        await this.fileService.create(f);
      }
    }

    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepo.findOne({
      where: { id, is_deleted: false },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, data: Partial<Event>): Promise<Event> {
    await this.findOne(id);
    await this.eventRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const event = await this.findOne(id);
    event.is_deleted = true;
    await this.eventRepo.save(event);
    return { message: 'Event deleted' };
  }
}
