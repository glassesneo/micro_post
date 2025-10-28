import type { PostType } from "@micro_post/shared";
import { Fragment, type ReactNode, use } from "react";
import { deletePost, getPostList } from "../api/Post";
import { PostListContext } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { getDateStr } from "../utils/date";
import { post_styles } from "./styles.css";

export const Post = ({ post }: { post: PostType }) => {
	const { userInfo } = use(UserContext);
	const { setPostList } = use(PostListContext);

	const onSendClick = async () => {
		await deletePost(userInfo.accessToken, post.id);
		const currentPostList = await getPostList(userInfo.accessToken);
		setPostList(currentPostList);
	};

	const getLines = (src: string): ReactNode => {
		return src.split("\n").map((line, index) => {
			return (
				// biome-ignore lint: The order won't change
				<Fragment key={index}>
					{line}
					<br />
				</Fragment>
			);
		});
	};

	return (
		<div className={post_styles.item}>
			<div className={post_styles.metaRow}>
				<span className={post_styles.user}>{post.user_name}</span>
				<span>{getDateStr(post.created_at)}</span>
				<button
					className={post_styles.deleteButton}
					type="button"
					onClick={onSendClick}
				>
					Delete
				</button>
			</div>
			<div className={post_styles.content}>{getLines(post.content)}</div>
		</div>
	);
};
