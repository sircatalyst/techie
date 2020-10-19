import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { createDocument } from "./utils/swagger/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";

import { appConfig, swaggerConfig } from "./config/index";
import { LoggerInterceptor } from "./middleware/responseLogger";
import { HttpExceptionFilter } from "./middleware/errorFilter";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});
	app.setGlobalPrefix("api/v1");
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	SwaggerModule.setup(swaggerConfig.swaggerBaseUrl, app, createDocument(app));
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new LoggerInterceptor());

	Logger.log(`APP Listening on port: ${appConfig.port}`);
	Logger.log(`APP MODE: ${appConfig.environment} mode`);

	await app.listen(appConfig.port);
}
bootstrap();
