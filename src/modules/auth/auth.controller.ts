import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @Post('/signup')
  async signup(@Body() signupData: User) {
    const createdUser = await this.userService.create(signupData);
    return {
      user: createdUser,
      token: this.jwtService.sign({ userId: createdUser._id }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    // TODO
    console.log('profile');
  }
}
