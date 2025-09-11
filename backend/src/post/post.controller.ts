import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
	constructor(private readonly postService: PostService) {}
	@Post()
	async createPost(
		@Body("message") message: string,
		@Query("token") token: string,
	) {
		return await this.postService.createPost(message, token);
	}

	@Get()
	async getList(
		@Query("token") token: string,
		@Query("start") start: number = 0,
		@Query("records") records: number,
	) {
		return await this.postService.getList(token, start, records);
	}

	@Get(":id")
	async getListByUser(
		@Param("id") id: number,
		@Query("token") token: string,
		@Query("start") start: number = 0,
		@Query("records") records: number,
	) {
		return await this.postService.getListByUser(token, id, start, records);
	}
}
