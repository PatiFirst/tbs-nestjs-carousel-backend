import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from './carousel.entity';
import { CarouselRepository } from './carousel.repository';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { GetCarouselFilterDto } from './dto/get-carousel-filter.dto';
import { ImgUrl } from './dto/imgUrl.dto';
import { UpdateCarousel } from './dto/update-carousel.dto';

@Injectable()
export class CarouselService {
    constructor(
        @InjectRepository(CarouselRepository)
        private carouselRepository: CarouselRepository,
    ) {}

    getCarousels(filterDto: GetCarouselFilterDto): Promise<Carousel[]> {
        return this.carouselRepository.getCarousels(filterDto)
    }

    async getCarouselById(id: string): Promise<Carousel> {
        const found = await this.carouselRepository.findOne({where: { id }})

        if (!found) {
            throw new NotFoundException(`Carousel with ID "${id}" not found"`)
        }

        return found
    }

    createCarousel(
        createCarouselDto: CreateCarouselDto,
        imgUrl: ImgUrl
    ): Promise<Carousel> {
        return this.carouselRepository.createCarousel(createCarouselDto, imgUrl);
    }

    async deleteCarouselById(id: string): Promise<void>{
        const result = await this.carouselRepository.delete({ id })
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id} not found`);

        }
    }

    async updateCarouselImgById(id: string, imgUrl: string): Promise<Carousel> {
        const carousel = await this.getCarouselById(id)

        carousel.imgUrl = imgUrl
        await this.carouselRepository.save(carousel)

        return carousel
    }

    async updateCarouselById(id: string, updateCarousel: UpdateCarousel, imgUrl?: string): Promise<Carousel> {
        const carousel = await this.getCarouselById(id)
    
        const { title, description, link } = updateCarousel

        carousel.title = title
        carousel.description = description
        carousel.imgUrl = imgUrl
        carousel.link = link

        await this.carouselRepository.save(carousel)
        return carousel
    }
}