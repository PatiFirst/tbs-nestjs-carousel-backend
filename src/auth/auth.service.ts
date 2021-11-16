import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AdminRepository } from './account/admin.repository';
import { UserRepository } from './account/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,

        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,

        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user && user.password === password) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        // console.log(payload)
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signUpAdmin(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.adminRepository.createAdmin(authCredentialsDto);
    }

    async signInUser (authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { role } = user
            const payload: JwtPayload = { username, role };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
          } else {
            throw new UnauthorizedException('Please check your login credential');
          }
    }

    async signInAdmin (authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const admin = await this.adminRepository.findOne({ username });
    

        if (admin && (await bcrypt.compare(password, admin.password))) {
            const { role } = admin
            const payload: JwtPayload = { username, role };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
          } else {
            throw new UnauthorizedException('Please check your login credential');
          }
    }



}
