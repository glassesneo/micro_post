import { use, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/Auth";
import { UserContext } from "../contexts/UserContext";
import { sign_in_styles } from "./styles.css";

export const SignUp = () => {
	const userIdInputId = useId();
	const emailInputId = useId();
	const passwordInputId = useId();

	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const { setUserInfo } = use(UserContext);

	const navigate = useNavigate();

	const onSignUpClick = async () => {
		const result = await signUp({ name: userId, email, password });
		if (result?.access_token) {
			setUserInfo({
				id: result.user_id,
				accessToken: result.access_token,
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
				<label htmlFor={emailInputId} className={sign_in_styles.label}>
					email
				</label>
				<input
					id={emailInputId}
					className={sign_in_styles.input}
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					onClick={onSignUpClick}
				>
					Signup
				</button>
			</div>
		</div>
	);
};
