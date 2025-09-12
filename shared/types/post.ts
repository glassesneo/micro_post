export type PostResponseDto = {
	id: number;
	content: string;
	user_name: string;
	created_at: string;
};

export type PostType = Omit<PostResponseDto, "created_at"> & {
	created_at: Date;
};
