import { use, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/Auth";
import { UserContext } from "../contexts/UserContext";
import { sign_in_styles } from "./styles.css";

export const SignIn = () => {
	const userIdInputId = useId();
	const passwordInputId = useId();

	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");

	const { setUserInfo } = use(UserContext);

	const navigate = useNavigate();

	const onSignInClick = async () => {
		console.log("onSignInClick");
		const result = await signIn(userId, password);
		if (result?.token) {
			setUserInfo({
				id: result.user_id,
				token: result.token,
			});
			navigate("/main");
		}
	};
	return (
		<div className={sign_in_styles.frame}>
			<div className={sign_in_styles.row}>
				<label htmlFor={userIdInputId} className={sign_in_styles.label}>
					ID
				</label>
				<input
					id={userIdInputId}
					className={sign_in_styles.input}
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</div>

			<div className={sign_in_styles.row}>
				<label htmlFor={passwordInputId} className={sign_in_styles.label}>
					Password
				</label>
				<input
					id={passwordInputId}
					className={sign_in_styles.input}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className={sign_in_styles.row}>
				<button
					type="button"
					className={sign_in_styles.button}
					onClick={onSignInClick}
				>
					Login
				</button>
			</div>
		</div>
	);
};
