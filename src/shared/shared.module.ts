import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserService } from "./user.service";
import { HttpExceptionFilter } from "./http-exception.filter";
import { LoggingInterceptor } from "./logging.interceptor";
import { UserSchema } from "../models/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UserService],
})
export class SharedModule {}
