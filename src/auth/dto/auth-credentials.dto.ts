import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../role/roles.enum";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    password: string;

    @IsNotEmpty()
    role: Role;
}