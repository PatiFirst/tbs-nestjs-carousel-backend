import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid4 } from "uuid";
import { CarouselService } from './carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { saveImageToStorage } from './helper/image-storage';


import toStream = require('buffer-to-stream')
import { createWriteStream } from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetCarouselFilterDto } from './dto/get-carousel-filter.dto';
import { Carousel } from './carousel.entity';
import { UpdateCarousel } from './dto/update-carousel.dto';
import { Role } from 'src/auth/role/roles.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';


@Controller('carousels')
export class CarouselController {
    constructor (
        private readonly carouselService: CarouselService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    @Post('/test')
    @UseInterceptors(
        FileInterceptor('image', saveImageToStorage )
    )
    test(
        // @Body() file: any,
        @UploadedFile() image: Express.Multer.File
    ){
        console.log("OK")
        console.log(image)
    }

    @Get()
    getCarousels(
        @Query() filterDto: GetCarouselFilterDto,
    ): Promise<Carousel[]> {
        return this.carouselService.getCarousels(filterDto)
    }
    @Get('/:id')
    getCarouselById(@Param('id') id: string) {
        return this.carouselService.getCarouselById(id)
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('image', saveImageToStorage )
    )
    createCarousel(
        @Body() createCarouselDto: CreateCarouselDto,
        @UploadedFile() file: Express.Multer.File,
    ){
        // console.log(createCarouselDto)
        // console.log(file)
        this.cloudinaryService.uploadImage(file)
        .then((img) => {
            return this.carouselService.createCarousel(createCarouselDto, img.url)
        })
        .catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }

    @Delete('/:id')
    deleteCarouselById(@Param('id') id: string): Promise<void> {
        return this.carouselService.deleteCarouselById(id)
    }

    @Put('/:id/img')
    @UseInterceptors(
        FileInterceptor('image', saveImageToStorage )
    )
    updateCarouselImgById(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        this.cloudinaryService.uploadImage(file)
        .then((img) => {
            return this.carouselService.updateCarouselImgById(id, img.url)
        })
        .catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }


    @Put('/:id/update')
    @UseInterceptors(
        FileInterceptor('image', saveImageToStorage )
    )
    updateCarouselById(
        @Param('id') id: string,
        @Body() updateCarousel: UpdateCarousel,
        @UploadedFile() file: Express.Multer.File,
    ){
        if (!file) {
            return this.carouselService.updateCarouselById(id, updateCarousel)
        } else {
            this.cloudinaryService.uploadImage(file)
            .then((img) => {
                const imgUrl = img.url
                return this.carouselService.updateCarouselById(id, updateCarousel, imgUrl)
            })
            .catch(() => {
                throw new BadRequestException('Invalid file type.');
            });
        }
    }
}
