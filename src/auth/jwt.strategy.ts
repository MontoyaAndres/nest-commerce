import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

import { AuthService } from "./auth.service";
import { Payload } from "../types/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  public async validate(payload: Payload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      return done(
        new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
