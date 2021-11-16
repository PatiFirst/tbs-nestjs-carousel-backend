import { IsNotEmpty } from "class-validator"

export class CreateCarouselDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    imgUrl: string;

    @IsNotEmpty()
    link: string;

    // @IsNotEmpty()
    // createdAt: Date;
}