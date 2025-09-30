import { use, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileLayout } from "../components/ProfileLayout";
import {
	NotLoginProfile,
	ProfileContext,
	type ProfileInfo,
} from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";

export const Profile = () => {
	const { slug } = useParams();

	const { userInfo } = use(UserContext);
	const [profile, setProfile] = useState<ProfileInfo>(NotLoginProfile);

	if (slug !== String(userInfo.id)) {
		return <h2>Cannot view other user's profile</h2>;
	}

	return (
		<ProfileContext value={{ profile, setProfile }}>
			<ProfileLayout />
		</ProfileContext>
	);
};
