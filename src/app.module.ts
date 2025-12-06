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
  ],
  controllers: [HealthController],
})
export class AppModule {}
