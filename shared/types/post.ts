export type PostType = {
	id: number;
	content: string;
	user_name: string;
	created_at: Date;
};

export type PostResponseDto = Omit<PostType, "created_at"> & {
	created_at: string;
};

