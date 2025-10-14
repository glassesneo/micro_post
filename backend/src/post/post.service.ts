import { PostType } from "@micro_post/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MicroPost } from "../entities/microposts";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(MicroPost)
		private microPostsRepository: Repository<MicroPost>,
	) {}

	async createPost(message: string, user_id: number) {
		const record = {
			user_id: user_id,
			content: message,
		};

		await this.microPostsRepository.save(record);
	}

	async getList(start: number = 0, number_of_records: number) {
		const qb = this.microPostsRepository
			.createQueryBuilder("micro_post")
			.leftJoinAndSelect("users", "user", "user.id=micro_post.user_id")
			.select([
				"micro_post.id as id",
				"user.name as user_name",
				"micro_post.content as content",
				"micro_post.created_at as created_at",
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
				"micro_post.content as content",
				"micro_post.created_at as created_at",
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
