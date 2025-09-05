import { Fragment, type ReactNode } from "react";
import type { PostType } from "../contexts/PostListContext";

const getDateStr = (dateObj: Date) => {
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1;
	const date = dateObj.getDate();
	const hour = dateObj.getHours();
	const min = dateObj.getMinutes();
	const sec = dateObj.getSeconds();
	return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
};

export const Post = (props: any) => {
	const { post }: { post: PostType } = props;
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
		<div>
			<div>{getDateStr(post.created_at)}</div>
			<div>{post.user_name}</div>
			<div>{getLines(post.content)}</div>
		</div>
	);
};
