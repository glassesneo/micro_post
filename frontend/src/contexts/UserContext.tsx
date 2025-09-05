import { createContext, type Dispatch, type SetStateAction } from "react";

export type UserInfo = {
	id: number;
	token: string;
};

export const NotLoginState: UserInfo = {
	id: 0,
	token: "",
};

export const UserContext = createContext(
	{} as {
		userInfo: UserInfo;
		setUserInfo: Dispatch<SetStateAction<UserInfo>>;
	},
);
