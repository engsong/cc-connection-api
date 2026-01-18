import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './common/logger.module';
import { AcademicYearModule } from './academic_years/academic-year.module';
import { BranchModule } from './branch/branch.module';
import { YearLevelModule } from './year-level/year-level.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ParentModule } from './parents/parent.module';
import { LaocationModule } from './location/laocation.module';
import { StudentModule } from './students/student.module';
import { SavingsModule } from './savings/saving.module';
import { ParticipationListModule } from './participant-list/participation-list.module';
import { ParticipationScoresModule } from './particippant-scores/participation-scores.module';
import { AdminsModule } from './admin/admins.module';
import { PermissionModulesModule } from './permission-module/permission-modules.module';
import { PermissionsModule } from './permission/permissions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CommentsModule } from './comments/comments.module';
import { RolesModule } from './role/role.module';
import { FileModule } from './file/file.module';
import { EventModule } from './event/event.module';
import { TaskModule } from './task/task.module';
import { EventActivityModule } from './eventactivity/eventActivity.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonInfoModule } from './lesson_info/lesson-info.module';
import { HomeworkModule } from './homework/homework.module';
import { EvaluationModule } from './evaluations/evaluation.module';
import { ParticipationScoreModule } from './participantion_score/participation-score.module';
import { PermissionModuleModule } from './permission_modules/permission-module.module';
import { PermissionModule } from './permissions/permission.module';
import { ExaminationModule } from './examination/examination.module';
import { LevelsModule } from './levels/levels.module';
import { TeachingModule } from './teaching/teaching.module';
import { AppointmentPersonModule } from './appointment-person/appointment-person.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT') ?? '5432'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    LoggerModule,
    HealthModule,
    AcademicYearModule,
    BranchModule,
    YearLevelModule,
    AppointmentModule,
    ParentModule,
    LaocationModule,
    StudentModule,
    RolesModule,
    SavingsModule,
    ParticipationListModule,
    ParticipationScoresModule,
    AdminsModule,
    PermissionModulesModule,
    PermissionsModule,
    NotificationsModule,
    CommentsModule,
    FileModule,
    EventModule,
    TaskModule,
    EventActivityModule,
    AuthModule,
    SubjectsModule,
    LessonsModule,
    LessonInfoModule,
    HomeworkModule,
    EvaluationModule,
    ParticipationListModule,
    ParticipationScoreModule,
    PermissionModuleModule,
    PermissionModule,
    ExaminationModule,
    LevelsModule,
    TeachingModule,
    AppointmentPersonModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
