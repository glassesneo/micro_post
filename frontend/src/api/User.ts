import type {
	PostResponseDto,
	PostType,
	UserResponseDto,
} from "@micro_post/shared";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const getUser = async (
	user_id: number,
	token: string,
): Promise<UserResponseDto> => {
	const url = `${apiUrl}/user/${user_id}?token=${token}`;
	const response = await axios.get(url);
	return response.data;
};

const getListByUser = async (
	token: string,
	id: number,
): Promise<PostResponseDto[]> => {
	const url = `${apiUrl}/post/${id}?token=${token}&records=10`;
	const response = await axios.get(url);
	return response.data;
};

export const getPostListByUser = async (token: string, id: number) => {
	const posts = await getListByUser(token, id);
	if (posts) {
		return posts.map((p): PostType => {
			return {
				...p,
				created_at: new Date(p.created_at),
				updated_at:
					p.updated_at !== undefined ? new Date(p.updated_at) : undefined,
			};
		});
	} else {
		return [];
	}
};
