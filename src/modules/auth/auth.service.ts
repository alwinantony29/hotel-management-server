import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException("Email doesn't exist try signing up");
    }

    const isPasswordValid = await bcryptjs.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is wrong');
    }

    const { _id, name, phoneNo } = user.toObject();

    return {
      token: this.jwtService.sign({ userId: user._id }),
      user: { _id, name, phoneNo, email: user.email },
    };
  }
}
