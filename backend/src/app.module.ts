import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

export interface EnvironmentVariables {
	DATABASE_URL: string;
	DB_HOST: string;
	DB_USER: string;
	DB_PASS: string;
	DB_NAME: string;
}

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService<EnvironmentVariables, true>) => {
				return {
					type: "postgres",
					host: config.get("DB_HOST"),
					username: config.get("DB_USER"),
					password: config.get("DB_PASS"),
					database: config.get("DB_NAME"),
					autoLoadEntities: true,
					synchronize: true,
					url: config.get("DATABASE_URL"),
				};
			},
		}),
		UserModule,
		PostModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
