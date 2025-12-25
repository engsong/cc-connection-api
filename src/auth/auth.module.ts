import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Parent } from '../parents/parent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Parent]),
    JwtModule.register({
      secret: 'MY_SUPER_SECRET_KEY',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
