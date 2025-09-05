import { Suspense } from "react";
import { PostList } from "./PostList";
import { styles } from "./styles.css";

export const Contents = () => {
	return (
		<div className={styles.contents}>
			<Suspense fallback={<h2>Loading..</h2>}>
				<PostList />
			</Suspense>
		</div>
	);
};
