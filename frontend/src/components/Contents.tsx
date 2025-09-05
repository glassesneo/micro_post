import { Suspense } from "react";
import { PostList } from "./PostList";
import { common_styles } from "./styles.css";

export const Contents = () => {
	return (
		<div className={common_styles.contents}>
			<Suspense fallback={<h2>Loading..</h2>}>
				<PostList />
			</Suspense>
		</div>
	);
};
