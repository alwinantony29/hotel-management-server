import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
    console.log('JwtStrategy initialized');
  }

  async validate(payload: any) {
    console.log('🚀 ~ JwtStrategy ~ validate ~ validate:');
    return { userId: payload.sub, username: payload.username };
  }
}
