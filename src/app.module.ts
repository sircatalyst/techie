import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config';
import { LoggerMiddleware } from './middleware/requestLogger';
import { StudentModule } from './student/student.module';

@Module({
	imports: [ StudentModule,
		MongooseModule.forRoot(appConfig.db, {
			useCreateIndex: true,
			useFindAndModify: false
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	/* eslint-disable-next-line */
	configure(consumer: MiddlewareConsumer) {
		return consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}