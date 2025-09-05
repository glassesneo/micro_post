import axios from "axios";

export const getUser = async (user_id: number, token: string) => {
	const url = `/api/user/${user_id}?token=${token}`;
	const response = await axios.get(url);
	return response.data;
};

