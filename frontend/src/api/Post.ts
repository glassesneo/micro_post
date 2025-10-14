import type { PostResponseDto, PostType } from "@micro_post/shared";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const post = async (token: string, msg: string) => {
	const data = {
		message: msg,
	};
	const url = `${apiUrl}/post`;
	const response = await axios.post(url, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(response);
};

const getList = async (token: string) => {
	const url = `${apiUrl}/post?token=${token}&records=10`;
	const response = await axios.get(url);
	return response.data;
};

export const getPostList = async (token: string) => {
	const posts: PostResponseDto[] = await getList(token);
	if (posts) {
		const currentPostList = posts.map((p): PostType => {
			return { ...p, created_at: new Date(p.created_at) };
		});

		return currentPostList;
	} else {
		return [];
	}
};
