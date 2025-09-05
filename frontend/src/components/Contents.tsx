import { PostList } from "./PostList";
import { styles } from "./styles.css";

export const Contents = () => {
	return (
		<div className={styles.contents}>
			<PostList />
		</div>
	);
};
