import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import {
	NotLoginState,
	UserContext,
	type UserInfo,
} from "./contexts/UserContext";
import { Main } from "./pages/Main";

function App() {
	const [userInfo, setUserInfo] = useState<UserInfo>(NotLoginState);

	return (
		<div>
			<UserContext value={{ userInfo, setUserInfo }}>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/main" element={<Main />} />
				</Routes>
			</UserContext>
		</div>
	);
}

export default App;
