import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { SignIn } from "./components/SignIn";
import { UserContext, type UserInfo } from "./contexts/UserContext";

function App() {
	const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "" });
	return (
		<div>
			<UserContext value={{ userInfo, setUserInfo }}>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/main" element={<MainLayout />} />
				</Routes>
			</UserContext>
		</div>
	);
}

export default App;
