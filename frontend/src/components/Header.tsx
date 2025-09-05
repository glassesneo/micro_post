import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/User";
import { NotLoginState, UserContext } from "../contexts/UserContext";
import { common_styles, form_styles, header_styles } from "./styles.css";

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
		<div className={common_styles.header}>
			<span className={header_styles.title}>MicroPost</span>
			<span className={header_styles.user}>{userName}</span>
			<button type="button" className={form_styles.button} onClick={logout}>
				Logout
			</button>
		</div>
	);
};
