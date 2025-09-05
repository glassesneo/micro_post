import { createContext, type Dispatch, type SetStateAction } from "react";

export type UserInfo = {
	id: number;
	token: string;
};

export const UserContext = createContext(
	{} as {
		userInfo: UserInfo;
		setUserInfo: Dispatch<SetStateAction<UserInfo>>;
	},
);
