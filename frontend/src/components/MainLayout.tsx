import { Contents } from "./Contents";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { styles } from "./styles.css";
export const MainLayout = () => {
	return (
		<>
			<Header />
			<div className={styles.body}>
				<SideBar />
				<Contents />
			</div>
		</>
	);
};
