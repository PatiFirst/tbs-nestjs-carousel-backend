import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { Admin } from "./account.entity";
import * as bcrypt from "bcrypt"
import { Role } from "../role/roles.enum";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    async createAdmin(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ 
            username, 
            password: hashedPassword,
        });

        try {
            await this.save(user)
        } catch(error) {
            if (error.code === '42P01') { 
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}