import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentPerson } from './appointment-person.entity';
import { CreateAppointmentPersonDto } from './dto/create-appointment-person.dto';
import { UpdateAppointmentPersonDto } from './dto/update-appointment-person.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AppointmentPersonService {
  constructor(
    @InjectRepository(AppointmentPerson)
    private readonly repo: Repository<AppointmentPerson>,
  ) {}

  async create(dto: CreateAppointmentPersonDto) {
    const appointmentPerson = this.repo.create({
      id: randomUUID().replace(/-/g, '').slice(0, 24), // or use your ID strategy
      ...dto,
      is_deleted: false,
    });
    return await this.repo.save(appointmentPerson);
  }

  async createMany(dtos: CreateAppointmentPersonDto[]) {
    const data = dtos.map((dto) => ({
      id: randomUUID().replace(/-/g, '').slice(0, 24),
      ...dto,
      is_deleted: false,
    }));
    const result = await this.repo
      .createQueryBuilder()
      .insert()
      .into(AppointmentPerson)
      .values(data)
      .orIgnore()
      .execute();
    return { count: result.identifiers.length };
  }

  async findAll() {
    return this.repo.find({
      where: { is_deleted: false },
      order: { created_at: 'DESC' },
    });
  }

  async findByAppointmentId(appointmentId: string) {
    return this.repo.find({
      where: { appointment_id: appointmentId, is_deleted: false },
      order: { created_at: 'DESC' },
    });
  }

  async findByPersonId(personId: string) {
    return this.repo.find({
      where: { person_id: personId, is_deleted: false },
      order: { created_at: 'DESC' },
    });
  }

  async findByStatus(status: string) {
    return this.repo.find({
      where: { status, is_deleted: false },
    });
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: { id, is_deleted: false },
    });
  }

  async update(id: string, dto: UpdateAppointmentPersonDto) {
    const result = await this.repo.update({ id, is_deleted: false }, dto);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async softDelete(id: string) {
    const result = await this.repo.update(
      { id, is_deleted: false },
      { is_deleted: true, is_active: false, updated_at: new Date() },
    );

    return (result.affected ?? 0) > 0; // true if deleted
  }
  async findByPersonType(personType: string) {
    return this.repo.find({
      where: {
        person_type: personType,
        is_deleted: false,
      },
      order: { created_at: 'DESC' },
    });
  }
}
