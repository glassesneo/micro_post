import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/User";
import { NotLoginState, UserContext } from "../contexts/UserContext";
import { styles } from "./styles.css";

export const Header = () => {
	const navigate = useNavigate();

	const [userName, setUserName] = useState("");
	const { userInfo, setUserInfo } = use(UserContext);

	const logout = () => {
		setUserInfo(NotLoginState);
		navigate("/");
	};

	// biome-ignore lint: TODO
	useEffect(() => {
		const myGetUser = async () => {
			const user = await getUser(userInfo.id, userInfo.token);

			setUserName(user.name);
		};

		myGetUser();
	}, []);

	return (
		<div className={styles.header}>
			<span>MicroPost</span>
			<span>{userName}</span>
			<button type="button" onClick={logout}>
				Logout
			</button>
		</div>
	);
};
