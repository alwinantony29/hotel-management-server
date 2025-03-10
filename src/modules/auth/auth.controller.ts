import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @Post('/signup')
  signup(@Body() signupData: User) {
    return this.userService.create(signupData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    // TODO
    console.log('profile');
  }
}
