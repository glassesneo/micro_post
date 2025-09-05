import { use, useState } from "react";
import { post } from "../api/Post";
import { UserContext } from "../contexts/UserContext";
import { styles } from "./styles.css";

export const SideBar = () => {
	const [messsage, setMessage] = useState("");

	const { userInfo } = use(UserContext);

	const onSendClick = () => {
		post(String(userInfo.id), userInfo.token, messsage);
	};

	return (
		<div className={styles.sidebar}>
			<div>hoge</div>
			<div>hoge@example.com</div>
			<div>
				<textarea
					rows={4}
					value={messsage}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit" onClick={onSendClick}>
					Send
				</button>
			</div>
		</div>
	);
};
