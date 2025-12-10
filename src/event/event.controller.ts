import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './events.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @Body('data') data: Partial<Event>,
    @Body('filePaths') filePaths?: string[],
  ): Promise<Event> {
    return this.eventService.create(data, filePaths);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.eventService.delete(id);
  }
}
