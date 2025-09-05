import { use, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/Auth";
import { UserContext } from "../contexts/UserContext";

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
		<div>
			<div>
				<label htmlFor={userIdInputId}>ID</label>
				<input
					id={userIdInputId}
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</div>

			<div>
				<label htmlFor={passwordInputId}>Password</label>
				<input
					id={passwordInputId}
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div>
				<button type="button" onClick={onSignInClick}>
					Login
				</button>
			</div>
		</div>
	);
};
