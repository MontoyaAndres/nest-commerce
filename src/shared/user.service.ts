import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as argon2 from "argon2";

import { User } from "../types/user";
import { RegisterDTO, LoginDTO } from "../auth/auth.dto";
import { Payload } from "../types/payload";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  public async create(userDTO: RegisterDTO) {
    const user = await this.userModel.findOne({ username: userDTO.username });

    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();

    return this.sanitizeUser(user);
  }

  public async find() {
    return await this.userModel.find();
  }

  public async findByLogin({ username, password }: LoginDTO) {
    const user = await this.userModel
      .findOne({ username })
      .select("username password seller created address");

    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return this.sanitizeUser(user);
  }

  public async findByPayload({ username }: Payload) {
    return await this.userModel.findOne({ username });
  }

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized.password;

    return sanitized;
  }
}
