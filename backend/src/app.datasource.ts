import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { EnvironmentVariables } from "./app.module";

require("dotenv").config();

const configService = new ConfigService<EnvironmentVariables, true>();

const AppDataSource = new DataSource({
	type: "postgres",
	host: configService.get("DB_HOST"),
	username: configService.get("DB_USER"),
	password: configService.get("DB_PASS"),
	database: configService.get("DB_NAME"),
	entities: ["src/entities/*.ts"],
	migrations: ["src/migrations/*.ts"],
});

export default AppDataSource;
