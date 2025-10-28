import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreatePostDto {
	@Transform(({ value }) => value?.trim())
	@IsString({ message: "Post content must be a string" })
	@IsNotEmpty({ message: "Post content is required" })
	@MaxLength(280, { message: "Post content too long (max 280 characters)" })
	message: string;
}

export class EditPostDto {
	post_id: number;
	@Transform(({ value }) => value?.trim())
	@IsString({ message: "Post content must be a string" })
	@IsNotEmpty({ message: "Post content is required" })
	@MaxLength(280, { message: "Post content too long (max 280 characters)" })
	message: string;
}

export class DeletePostDto {
	post_id: number;
}

export type PostResponseDto = {
	id: number;
	content: string;
	user_name: string;
	created_at: string;
	updated_at?: string;
};

export type PostType = Omit<PostResponseDto, "created_at" | "updated_at"> & {
	created_at: Date;
	updated_at?: Date;
};
