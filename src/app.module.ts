import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarouselModule } from './carousel/carousel.module';
import { config } from './config/orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseConfig } from './config/database.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useClass: DatabaseConfig,
    }),
    CarouselModule,
    AuthModule,
    UserModule,
    // CloudinaryModule,
  ],
  controllers: [],
})
export class AppModule {}
