import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";

import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MulterModule.register({
      dest: "./uploads",
    }),
    SharedModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
