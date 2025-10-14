import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const signIn = async (name: string, password: string) => {
	// const url = `${apiUrl}/auth?user_id=${user_id}&password=${password}`;
	const url = `${apiUrl}/auth/login`;
	const response = await axios.post(url, {
		name,
		password,
	});
	console.log(response);
	return response.data;
};
