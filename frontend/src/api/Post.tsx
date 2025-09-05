import axios from "axios";
import type { PostType } from "../contexts/PostListContext";

export type PostData = Omit<PostType, "created_at"> & { created_at: string };

export const post = async (user_id: string, token: string, msg: string) => {
	const data = {
		message: msg,
	};
	const url = `/api/post?user_id=${user_id}&token=${token}`;
	const response = await axios.post(url, data);
	console.log(response);
};

export const getList = async (token: string) => {
	const url = `/api/post?token=${token}&records=10`;
	const response = await axios.get(url);
	return response.data;
};

export const getPostList = async (token: string) => {
	const posts: PostData[] = await getList(token);
	console.log(posts);
	if (posts) {
		const currentPostList = posts.map((p): PostType => {
			return { ...p, created_at: new Date(p.created_at) };
		});

		return currentPostList;
	} else {
		return [];
	}
};
