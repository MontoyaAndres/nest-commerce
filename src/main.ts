import "dotenv/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

if (process.env.NODE_ENV === "test") {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  Logger.log("----------TESTING IN PROCESS----------");
  Logger.log("using database", process.env.MONGO_URI);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  await app.listen(3000);
}

bootstrap();
