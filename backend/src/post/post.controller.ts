import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "../entities/user.entity";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
	constructor(private readonly postService: PostService) {}
	@UseGuards(JwtAuthGuard)
	@Post()
	async createPost(
		@Body("message") message: string,
		@CurrentUser() user: User,
	) {
		return await this.postService.createPost(message, user.id);
	}

	@Get()
	async getList(
		@Query("start") start: number = 0,
		@Query("records") records: number,
	) {
		return await this.postService.getList(start, records);
	}

	@Get(":id")
	async getListByUser(
		@Param("id") id: number,
		@Query("start") start: number = 0,
		@Query("records") records: number,
	) {
		return await this.postService.getListByUser(id, start, records);
	}
}
