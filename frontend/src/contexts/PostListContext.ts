import type { PostType } from "@micro_post/shared";
import { createContext, type Dispatch, type SetStateAction } from "react";

export const PostListContext = createContext(
	{} as {
		postList: PostType[];
		setPostList: Dispatch<SetStateAction<PostType[]>>;
	},
);
