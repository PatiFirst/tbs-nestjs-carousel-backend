import { EntityRepository, Repository } from "typeorm";
import { Carousel } from "./carousel.entity";
import { CreateCarouselDto } from "./dto/create-carousel.dto";
import { GetCarouselFilterDto } from "./dto/get-carousel-filter.dto";
import { ImgUrl } from "./dto/imgUrl.dto";


@EntityRepository(Carousel)
export class CarouselRepository extends Repository<Carousel> {

    async getCarousels(filterDto: GetCarouselFilterDto): Promise<Carousel[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('carousel')
        

        if(search) {
            query.andWhere(
                '(LOWER(carousel.title) LIKE LOWER(:search) OR LOWER(carousel.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }
    
        const carousels = await query.getMany();
        return carousels;
    }

    async createCarousel(createCarouselDto: CreateCarouselDto, url): Promise<Carousel> {
        const { title, description, link } = createCarouselDto;

        const carousel = this.create({
            title,
            description,
            imgUrl: url,
            link,
            // createdAt,
        });

        await this.save(carousel)
        return carousel
    }
}