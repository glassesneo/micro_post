import {
	CreatePostDto,
	DeletePostDto,
	EditPostDto,
	PostType,
} from "@micro_post/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MicroPost } from "../entities/microposts";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(MicroPost)
		private microPostsRepository: Repository<MicroPost>,
	) {}

	async createPost(createPostDto: CreatePostDto, user_id: number) {
		const record = {
			user_id: user_id,
			content: createPostDto.message,
		};

		await this.microPostsRepository.save(record);
	}

	async editPost(editPostDto: EditPostDto, user_id: number) {
		const result = await this.microPostsRepository
			.createQueryBuilder("micro_post")
			.update()
			.set({ content: editPostDto.message })
			.where({ user_id: user_id, id: editPostDto.post_id })
			.execute();

		if (result.affected === 0) {
			throw new NotFoundException("Post not found");
		}
	}

	async deletePost(deletePostDto: DeletePostDto, user_id: number) {
		const result = await this.microPostsRepository
			.createQueryBuilder("micro_post")
			.delete()
			.from(MicroPost)
			.where({ user_id: user_id, id: deletePostDto.post_id })
			.execute();

		if (result.affected === 0) {
			throw new NotFoundException("Post not found");
		}
	}

	async getList(start: number = 0, number_of_records: number) {
		const qb = this.microPostsRepository
			.createQueryBuilder("micro_post")
			.leftJoinAndSelect("users", "user", "user.id=micro_post.user_id")
			.select([
				"micro_post.id as id",
				"user.name as user_name",
				"micro_post.user_id as user_id",
				"micro_post.content as content",
				"micro_post.created_at as created_at",
				"micro_post.updated_at as updated_at",
			])
			.orderBy("micro_post.created_at", "DESC")
			.offset(start)
			.limit(number_of_records);

		const records = await qb.getRawMany<PostType>();
		console.log(records);
		return records;
	}

	async getListByUser(
		id: number,
		start: number = 0,
		number_of_records: number,
	) {
		const qb = this.microPostsRepository
			.createQueryBuilder("micro_post")
			.leftJoinAndSelect("users", "user", "user.id=micro_post.user_id")
			.select([
				"micro_post.id as id",
				"user.name as user_name",
				"micro_post.user_id as user_id",
				"micro_post.content as content",
				"micro_post.created_at as created_at",
				"micro_post.updated_at as updated_at",
			])
			.where("micro_post.user_id = :id", { id })
			.orderBy("micro_post.created_at", "DESC")
			.offset(start)
			.limit(number_of_records);

		const records = await qb.getRawMany<PostType>();
		console.log(records);
		return records;
	}
}
