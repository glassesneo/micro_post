import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { MicroPost } from "../entities/microposts";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
	imports: [TypeOrmModule.forFeature([MicroPost]), AuthModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
