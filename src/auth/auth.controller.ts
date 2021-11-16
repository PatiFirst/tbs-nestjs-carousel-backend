import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './role/roles.decorator';
import { Role } from './role/roles.enum';
import { RolesGuard } from './role/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Get('profile')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile() {
  return "Admin";
  }


  @Post('signup/user')
  signUpUser(@Body() authCredentialsDto:AuthCredentialsDto): Promise<void> {
    return this.authService.signUpUser(authCredentialsDto);
  }

  @Post('signup/admin')
  signUpAdmin(@Body() authCredentialsDto:AuthCredentialsDto): Promise<void> {
    return this.authService.signUpAdmin(authCredentialsDto);
  }

  @Post('signin/user')
  signInUser(@Body() authCredentialsDto:AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signInUser(authCredentialsDto)
  }

  @Post('signin/admin')
  signInAdmin(@Body() authCredentialsDto:AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signInAdmin(authCredentialsDto)
  }
}
