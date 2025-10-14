import { createContext, type Dispatch, type SetStateAction } from "react";

export type UserInfo = {
	id: number;
	accessToken: string;
};

export const NotLoginState: UserInfo = {
	id: 0,
	accessToken: "",
};

export const UserContext = createContext(
	{} as {
		userInfo: UserInfo;
		setUserInfo: Dispatch<SetStateAction<UserInfo>>;
	},
);
