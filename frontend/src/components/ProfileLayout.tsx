import type { PostType } from "@micro_post/shared";
import { use, useEffect, useState } from "react";
import { getPostListByUser, getUser } from "../api/User";
import { UserContext } from "../contexts/UserContext";
import { Header } from "./Header";
import { Post } from "./Post";
import { post_styles } from "./styles.css";

type UserProfile = {
	name: string;
	postList: PostType[];
};

export const ProfileLayout = () => {
	const [profile, setProfile] = useState<UserProfile>({
		name: "",
		postList: [],
	});
	const { userInfo } = use(UserContext);

	// biome-ignore lint: TODO
	useEffect(() => {
		const myGetUser = async () => {
			const user = await getUser(userInfo.id, userInfo.token);
			const postList = await getPostListByUser(userInfo.token, userInfo.id);
			setProfile({ name: user.name, postList: postList });
		};

		myGetUser();
	}, []);

	return (
		<>
			<Header />
			<div>
				<h2>{profile.name}'s Profile</h2>
				<div className={post_styles.list}>
					{profile.postList.length ? (
						profile.postList.map((p) => <Post key={p.id} post={p} />)
					) : (
						<h2>No post available</h2>
					)}
				</div>
			</div>
		</>
	);
};
