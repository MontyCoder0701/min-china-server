import { NestFactory } from "@nestjs/core";

import * as cookieParser from "cookie-parser";
import * as express from "express";
import { join } from "path";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  await app.listen(3200);
}
bootstrap();
