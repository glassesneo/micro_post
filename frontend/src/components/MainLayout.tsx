import { Contents } from "./Contents";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { common_styles } from "./styles.css";
export const MainLayout = () => {
	return (
		<>
			<Header />
			<div className={common_styles.body}>
				<SideBar />
				<Contents />
			</div>
		</>
	);
};
