import type {
	EditPostDto,
	PostResponseDto,
	PostType,
} from "@micro_post/shared";
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

export const editPost = async (token: string, editPostDto: EditPostDto) => {
	const url = `${apiUrl}/post/${editPostDto.post_id}`;
	const response = await axios.put(
		url,
		{ message: editPostDto.message },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	console.log(response);
};

export const deletePost = async (token: string, post_id: number) => {
	const url = `${apiUrl}/post/${post_id}`;
	const response = await axios.delete(url, {
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
			return {
				...p,
				created_at: new Date(p.created_at),
				updated_at:
					p.updated_at !== undefined ? new Date(p.updated_at) : undefined,
			};
		});

		return currentPostList;
	} else {
		return [];
	}
};
