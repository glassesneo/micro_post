import { Fragment, type ReactNode } from "react";
import type { PostType } from "../contexts/PostListContext";
import { post_styles } from "./styles.css";

const getDateStr = (dateObj: Date) => {
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1;
	const date = dateObj.getDate();
	const hour = dateObj.getHours();
	const min = dateObj.getMinutes();
	const sec = dateObj.getSeconds();
	return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
};

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
