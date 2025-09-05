import { use, useState } from "react";
import { getPostList, post } from "../api/Post";
import { PostListContext } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { common_styles, form_styles, sidebar_styles } from "./styles.css";

export const SideBar = () => {
	const [message, setMessage] = useState("");

	const { userInfo } = use(UserContext);
	const { setPostList } = use(PostListContext);

	const onSendClick = async () => {
		await post(String(userInfo.id), userInfo.token, message);
		const currentPostList = await getPostList(userInfo.token);
		setPostList(currentPostList);
	};

	return (
		<div className={common_styles.sidebar}>
			<div className={sidebar_styles.section}>
				<div className={sidebar_styles.profile}>User: {userInfo.id}</div>
			</div>
			<div className={sidebar_styles.section}>
				<textarea
					rows={4}
					className={form_styles.textarea}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="いまどうしてる？"
				/>
			</div>
			<div>
				<button
					type="submit"
					className={form_styles.button}
					onClick={onSendClick}
				>
					Send
				</button>
			</div>
		</div>
	);
};
