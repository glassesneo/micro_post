import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const signIn = async (user_id: string, password: string) => {
	const url = `${apiUrl}/auth?user_id=${user_id}&password=${password}`;
	console.log(url);
	const response = await axios.get(url);
	console.log(response);
	return response.data;
};
