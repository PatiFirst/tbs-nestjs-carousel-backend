import { IsOptional } from "class-validator";

export class GetCarouselFilterDto {
    @IsOptional()
    search?: string;
}