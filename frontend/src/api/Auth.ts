import type { LoginDto, SignupDto } from "@micro_post/shared";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_MICROPOST_API_URL;

export const signIn = async ({ name, password }: LoginDto) => {
	// const url = `${apiUrl}/auth?user_id=${user_id}&password=${password}`;
	const url = `${apiUrl}/auth/login`;
	const response = await axios.post(url, {
		name,
		password,
	});
	console.log(response);
	return response.data;
};

export const signUp = async ({ name, email, password }: SignupDto) => {
	const url = `${apiUrl}/auth/signup`;
	const response = await axios.post(url, {
		name,
		email,
		password,
	});
	console.log(response);
	return response.data;
};
