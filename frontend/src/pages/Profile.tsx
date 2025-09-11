import { use } from "react";
import { useParams } from "react-router-dom";
import { ProfileLayout } from "../components/ProfileLayout";
import { UserContext } from "../contexts/UserContext";

export const Profile = () => {
	const { slug } = useParams();

	const { userInfo } = use(UserContext);

	if (slug !== String(userInfo.id)) {
		return <h2>Cannot view other user's profile</h2>;
	}

	return (
		<div>
			<ProfileLayout />
		</div>
	);
};
