import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './attendance.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async checkInOut(dto: CreateAttendanceDto) {
    const todayAttendance = await this.attendanceRepo.findOne({
      where: {
        student_id: dto.student_id,
        created_at: Raw((alias) => `${alias}::date = CURRENT_DATE`),
      },
    });

    // ดึงเวลาเรียนจริง (ตัวอย่าง fix แต่ควรดึงจาก class schedule)
    const classStartTime = '08:00'; // HH:mm
    const classEndTime = '16:00'; // HH:mm

    // เวลาเช็คอินและเช็คเอาต์
    const checkInTime =
      dto.check_in || new Date().toLocaleTimeString('en-GB', { hour12: false });
    const checkOutTime = dto.check_out;

    // เช็ค late / early leave
    const isLate = checkInTime > classStartTime;
    const isEarlyLeave = checkOutTime && checkOutTime < classEndTime;

    if (!todayAttendance) {
      // สร้าง attendance ใหม่
      const attendance = this.attendanceRepo.create({
        ...dto,
        check_in: checkInTime,
        check_out: checkOutTime,
        remark: isLate ? 'Late' : 'On time',
      });
      // ถ้า check_out มีกำหนดเวลา
      if (isEarlyLeave) attendance.remark = 'Early leave';
      return this.attendanceRepo.save(attendance);
    } else {
      // อัพเดต attendance
      if (dto.check_in) {
        todayAttendance.check_in = checkInTime;
        todayAttendance.remark = isLate ? 'Late' : 'On time';
      }
      if (dto.check_out) {
        todayAttendance.check_out = checkOutTime;
        // ถ้า check-out ก่อนเวลาเรียนจบ
        if (isEarlyLeave) todayAttendance.remark = 'Early leave';
      }
      if (dto.reason) todayAttendance.reason = dto.reason;

      return this.attendanceRepo.save(todayAttendance);
    }
  }

  async findTodayByStudent(student_id: string) {
    return this.attendanceRepo
      .createQueryBuilder('a')
      .where('a.student_id = :student_id', { student_id })
      .andWhere('DATE(a.created_at) = CURRENT_DATE')
      .orderBy('a.created_at', 'DESC')
      .getMany();
  }

  async findAllStudentsWithAttendance(
    class_id: string,
    academic_year_id: string,
    branch_id: string,
    start_date: string,
    end_date: string,
    student_id?: string,
  ) {
    const qb = this.studentRepo
      .createQueryBuilder('s')
      .leftJoinAndSelect(
        's.attendances',
        'a',
        'a.created_at BETWEEN :start AND :end',
        { start: `${start_date} 00:00:00`, end: `${end_date} 23:59:59` },
      )
      .where('s.class_id = :class_id', { class_id })
      .andWhere('s.academicYearId = :academic_year_id', { academic_year_id })
      .andWhere('s.branchId = :branch_id', { branch_id }); // ✅ camelCase

    if (student_id) {
      qb.andWhere('s.id = :student_id', { student_id });
    }

    qb.orderBy('s.first_name', 'ASC');

    return qb.getMany();
  }
}
