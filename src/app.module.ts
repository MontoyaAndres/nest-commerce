import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    SharedModule,
    AuthModule,
  ],
})
export class AppModule {}
