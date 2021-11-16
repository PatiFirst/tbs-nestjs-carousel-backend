import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AdminRepository } from './account/admin.repository';
import { UserRepository } from './account/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from './contants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './role/roles.guard';

@Module({
  imports: [
    JwtModule.register({
        secret: jwtConfig.secret,
        signOptions: {expiresIn: '60s'}
    }),
    TypeOrmModule.forFeature([UserRepository, AdminRepository]),
    UserModule, 
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthGuard, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
