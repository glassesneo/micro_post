import { createContext, type Dispatch, type SetStateAction } from "react";

export type PostType = {
	id: number;
	user_name: string;
	content: string;
	created_at: Date;
};

export const PostListContext = createContext(
	{} as {
		postList: PostType[];
		setPostList: Dispatch<SetStateAction<PostType[]>>;
	},
);
