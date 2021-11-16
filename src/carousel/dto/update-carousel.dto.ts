import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateCarousel {
    title?: string;
    description?: string;
    link?: string;

    @IsNotEmpty()
    createdAt: Date;
}