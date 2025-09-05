import axios from "axios";

export const signIn = async (user_id: string, password: string) => {
	const url = `/api/auth?user_id=${user_id}&password=${password}`;
	console.log(url);
	const response = await axios.get(url);
	console.log(response);
	return response.data;
};
