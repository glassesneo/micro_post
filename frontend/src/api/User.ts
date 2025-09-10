import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const getUser = async (user_id: number, token: string) => {
	const url = `${apiUrl}/user/${user_id}?token=${token}`;
	const response = await axios.get(url);
	return response.data;
};
