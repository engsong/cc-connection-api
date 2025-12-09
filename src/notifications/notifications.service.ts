import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  // ================= CREATE =================
  async create(dto: CreateNotificationDto) {
    const data = this.repo.create(dto);
    return await this.repo.save(data);
  }

  // ================= GET ALL =================
  async findAll() {
    return await this.repo.find({
      where: { is_deleted: false },
      relations: ['branch', 'academic_year'],
    });
  }

  // ================= GET BY ID =================
  async findOne(id: string) {
    const data = await this.repo.findOne({
      where: { id, is_deleted: false },
      relations: ['branch', 'academic_year'],
    });

    if (!data) throw new NotFoundException('Notification not found');
    return data;
  }

  // ================= UPDATE =================
  async update(id: string, dto: UpdateNotificationDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return await this.repo.save(data);
  }

  // ================= DELETE (soft delete) =================
  async remove(id: string) {
    const data = await this.findOne(id);
    data.is_deleted = true;
    return await this.repo.save(data);
  }

  // ================= GET BY BRANCH =================
  async findByBranch(body: { branch_id: string }) {
    return await this.repo.find({
      where: { branch_id: body.branch_id, is_deleted: false },
      relations: ['branch', 'academic_year'],
    });
  }
}
