import { Fragment, type ReactNode } from "react";
import type { PostType } from "../contexts/PostListContext";
import { getDateStr } from "../utils/date";
import { post_styles } from "./styles.css";

export const Post = ({ post }: { post: PostType }) => {
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
			</div>
			<div className={post_styles.content}>{getLines(post.content)}</div>
		</div>
	);
};
