import * as mongoose from "mongoose";
import * as argon2 from "argon2";

import { User } from "../types/user";

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: {
      type: String,
      select: false,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    address: {
      addr1: String,
      addr2: String,
      city: String,
      state: String,
      country: String,
      zip: Number,
    },
  },
  { timestamps: {} },
);

UserSchema.pre<User>("save", async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashed = await argon2.hash(this.password);
    this.password = hashed;

    return next();
  } catch (err) {
    return next(err);
  }
});
