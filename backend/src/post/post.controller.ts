import { CreatePostDto, DeletePostDto, EditPostDto } from "@micro_post/shared";
import {
	Body,
	Controller,
	Delete,
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
		@Body() createPostDto: CreatePostDto,
		@CurrentUser() user: User,
	) {
		return await this.postService.createPost(createPostDto, user.id);
	}

	// @Post()
	// async editPost(@Body() editPostDto: EditPostDto, @CurrentUser() user: User) {
	// return await this.postService.editPost(editPostDto, user.id);
	// }

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async deletePost(@Param("id") id: number, @CurrentUser() user: User) {
		console.log(`id: ${id}`);
		return await this.postService.deletePost({ post_id: id }, user.id);
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
