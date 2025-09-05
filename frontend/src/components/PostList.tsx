import { use } from "react";
import { getList } from "../api/Post";
import { PostListContext, type PostType } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { Post } from "./Post";

type PostData = Omit<PostType, "created_at"> & { created_at: string };

const getPostList = async (token: string) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const posts: PostData[] = await getList(token);
	console.log(posts);
	if (posts) {
		const currentPostList = posts.map((p): PostType => {
			return { ...p, created_at: new Date(p.created_at) };
		});

		return currentPostList;
	} else {
		return [];
	}
};

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
