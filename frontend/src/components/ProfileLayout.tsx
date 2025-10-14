import { use, useEffect } from "react";
import { getPostListByUser, getUser } from "../api/User";
import { ProfileContext } from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";
import { Header } from "./Header";
import { Post } from "./Post";
import { ProfileModal } from "./ProfileModal";
import { post_styles } from "./styles.css";

export const ProfileLayout = () => {
	// const [profile, setProfile] = useState<Profile>({
	// name: "",
	// postList: [],
	// });
	const { profile, setProfile } = use(ProfileContext);
	const { userInfo } = use(UserContext);

	// biome-ignore lint: TODO
	useEffect(() => {
		const myGetUser = async () => {
			const user = await getUser(userInfo.id, userInfo.accessToken);
			const postList = await getPostListByUser(
				userInfo.accessToken,
				userInfo.id,
			);
			setProfile({ name: user.name, postList: postList });
		};

		myGetUser();
	}, []);

	return (
		<>
			<Header />
			<div>
				<h2>{profile.name}'s Profile</h2>
				<ProfileModal
					buttonTitle="プロフィールを編集"
					userName={profile.name}
				/>
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
