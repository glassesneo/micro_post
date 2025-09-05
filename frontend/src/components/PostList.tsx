import { use } from "react";
import { getPostList } from "../api/Post";
import { PostListContext } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { Post } from "./Post";

export const PostList = () => {
	const { postList, setPostList } = use(PostListContext);
	const { userInfo } = use(UserContext);

	if (!postList.length) {
		throw getPostList(userInfo.token).then((data) => {
			setPostList(data);
		});
	}

	return (
		<div>
			<p>PostList</p>
			{postList.map((p) => (
				<Post key={p.id} post={p} />
			))}
		</div>
	);
};
