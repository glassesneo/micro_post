import axios from "axios";

export const post = async (user_id: string, token: string, msg: string) => {
	const data = {
		message: msg,
	};
	const url = `/api/post?user_id=${user_id}&token=${token}`;
	const response = await axios.post(url, data);
	console.log(response);
};
