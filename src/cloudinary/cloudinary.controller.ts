import { Controller, Get, Post, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/carousel/helper/image-storage';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
        constructor (private cloudinaryService: CloudinaryService) {}

    @Get()
    gethello() {
        return 'hello world'
    }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('image', saveImageToStorage )
    )
    async uploadImageToCloudinary(
        @UploadedFile() file: Express.Multer.File
    ) {
        return await this.cloudinaryService.uploadImage(file).catch(() => {
          throw new BadRequestException('Invalid file type.');
        });
    }
}
