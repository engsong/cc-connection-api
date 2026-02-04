import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { GetAttendanceRangeDto } from './dto/get-attendance-range.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // 📌 ใช้ตอน scan QR
  @Post('scan')
  checkInOut(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.checkInOut(dto);
  }

  // 📌 ดูประวัติวันนี้ของนักเรียน
  @Get('today/:student_id')
  findToday(@Param('student_id') student_id: string) {
    return this.attendanceService.findTodayByStudent(student_id);
  }

@Post('range')
getAllStudentsAttendance(@Body() body: GetAttendanceRangeDto) {
  const {
    class_id,
    academic_year_id,
    branch_id,
    start_date,
    end_date,
    student_id,
  } = body;

  return this.attendanceService.findAllStudentsWithAttendance(
    class_id,
    academic_year_id,
    branch_id,
    start_date,
    end_date,
    student_id,
  );
}

}
