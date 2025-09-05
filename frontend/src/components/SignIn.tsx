import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/Auth";

export const SignIn = () => {
	const userIdInputId = useId();
	const passwordInputId = useId();

	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const onSignInClick = () => {
		console.log("onSignInClick");
		signIn(userId, password);
		navigate("/main");
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
