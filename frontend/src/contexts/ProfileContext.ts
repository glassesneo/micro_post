import type { PostType } from "@micro_post/shared";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type ProfileInfo = {
	name: string;
	postList: PostType[];
};

export const NotLoginProfile: ProfileInfo = {
	name: "",
	postList: [],
};

export const ProfileContext = createContext(
	{} as {
		profile: ProfileInfo;
		setProfile: Dispatch<SetStateAction<ProfileInfo>>;
	},
);
