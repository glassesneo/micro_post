import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../entities/auth";
import { MicroPost } from "../entities/microposts";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
	imports: [TypeOrmModule.forFeature([MicroPost, Auth])],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
