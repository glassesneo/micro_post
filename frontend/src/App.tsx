import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { SignIn } from "./components/SignIn";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/main" element={<MainLayout />} />
			</Routes>
		</div>
	);
}

export default App;
