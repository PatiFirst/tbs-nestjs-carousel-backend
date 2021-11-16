import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CarouselController } from './carousel.controller';
import { CarouselRepository } from './carousel.repository';
import { CarouselService } from './carousel.service';



@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([CarouselRepository]),
    CloudinaryModule,
    
  ],
  controllers: [CarouselController],
  providers: [CarouselService]
})
export class CarouselModule {}
