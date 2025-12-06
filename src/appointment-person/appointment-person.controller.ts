import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AppointmentPersonService } from './appointment-person.service';
import { CreateAppointmentPersonDto } from './dto/create-appointment-person.dto';
import { UpdateAppointmentPersonDto } from './dto/update-appointment-person.dto';

@Controller('appointment-persons')
export class AppointmentPersonController {
  constructor(private readonly service: AppointmentPersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAppointmentPersonDto) {
    return this.service.create(dto);
  }

  // Most useful endpoints you'll actually use daily
  @Get()
  findAll(
    @Query('appointment_id') appointmentId?: string,
    @Query('person_id') personId?: string,
    @Query('person_type') personType?: string,
    @Query('status') status?: string,
  ) {
    if (appointmentId) return this.service.findByAppointmentId(appointmentId);
    if (personId) return this.service.findByPersonId(personId);
    if (personType) return this.service.findByPersonType(personType);
    if (status) return this.service.findByStatus(status);

    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const record = await this.service.findOne(id);
    if (!record) {
      throw new NotFoundException(`Appointment person with ID ${id} not found`);
    }
    return record;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentPersonDto,
  ) {
    const updated = await this.service.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Appointment person with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string) {
    const deleted = await this.service.softDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Appointment person with ID ${id} not found`);
    }
    return; // 204 No Content
  }
}
