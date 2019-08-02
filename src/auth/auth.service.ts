import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";

import { UserService } from "../shared/user.service";
import { Payload } from "../types/payload";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
  }

  public async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
