import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserService } from "../shared/user.service";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { Payload } from "../types/payload";
import { AuthService } from "./auth.service";
import { User } from "../utils/user.decorator";
import { SellerGuard } from "../guards/seller.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard("jwt"), SellerGuard)
  public async findAll(@User() user) {
    console.log(user);
    return "hey";
  }

  @Post("login")
  public async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);

    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post("register")
  public async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }
}
