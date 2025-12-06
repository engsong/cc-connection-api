import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { randomUUID } from 'crypto';
import { CreateAppointmentDto } from './create-appointment.dto';
import { UpdateAppointmentDto } from './update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const data = this.repo.create({
      id: randomUUID(),
      ...dto,
      created_at: new Date(),
    });

    return this.repo.save(data);
  }

  async findAll() {
    return this.repo.find({ where: { is_deleted: false } });
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({ where: { id, is_deleted: false } });
    if (!data) throw new NotFoundException('Appointment not found');
    return data;
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    const existing = await this.findOne(id);

    const updated = {
      ...existing,
      ...dto,
      updated_at: new Date(),
    };

    return this.repo.save(updated);
  }

  async softDelete(id: string) {
    const data = await this.findOne(id);

    data.is_deleted = true;
    data.updated_at = new Date();

    return this.repo.save(data);
  }
}
