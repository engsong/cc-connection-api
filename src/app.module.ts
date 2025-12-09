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
import { RoleModule } from './role/role.module';
import { SavingsModule } from './savings/saving.module';
import { ParticipationListModule } from './participant-list/participation-list.module';
import { ParticipationScoresModule } from './particippant-scores/participation-scores.module';
import { AdminsModule } from './admin/admins.module';
import { PermissionModulesModule } from './permission-module/permission-modules.module';
import { PermissionsModule } from './permission/permissions.module';
import { NotificationsModule } from './notifications/notifications.module';

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
    RoleModule,
    SavingsModule,
    ParticipationListModule,
    ParticipationScoresModule,
    AdminsModule,
    PermissionModulesModule,
    PermissionsModule,
    NotificationsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
