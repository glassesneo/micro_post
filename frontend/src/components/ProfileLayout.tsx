import { use, useEffect, useState } from "react";
import { getUser } from "../api/User";
import type { PostType } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { Header } from "./Header";

type UserProfile = {
	name: string;
	posts: PostType[];
};

export const ProfileLayout = () => {
	const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
	// const [userName, setUserName] = useState("");
	const { userInfo } = use(UserContext);

	// if (!userName.length) {
	// throw getUser(userInfo.id, userInfo.token).then((data) => {
	// if (!data) {
	// console.log("No user data");
	// }
	// console.log(`Name: ${data.name}`);
	// setUserName(data.name);
	// });
	// }

	// biome-ignore lint: TODO
	useEffect(() => {
		const myGetUser = async () => {
			const user = await getUser(userInfo.id, userInfo.token);
			setProfile({ name: user.name, posts: [] });
		};

		myGetUser();
	}, []);

	return (
		<>
			<Header />
			<div>
				<h2>{profile.name}'s Profile</h2>
			</div>
		</>
	);
};
