import type { PostType } from "@micro_post/shared";
import { use, useState } from "react";
import { Navigate } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { PostListContext } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";

export const Main = () => {
	const [postList, setPostList] = useState<PostType[]>([]);
	const { userInfo } = use(UserContext);
	const loggedIn = userInfo.token !== "";

	return (
		<PostListContext value={{ postList, setPostList }}>
			{loggedIn ? <MainLayout /> : <Navigate replace to="/" />}
		</PostListContext>
	);
};
