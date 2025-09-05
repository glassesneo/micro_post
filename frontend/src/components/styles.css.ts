import { style } from "@vanilla-extract/css";

export const styles = {
	header: style({
		width: "100%",
		height: 32,
		border: "2px solid red",
	}),
	body: style({
		width: "100%",
		height: "calc(100vh - 32px)",
		border: "2px solid green",
		display: "flex",
		flexDirection: "row",
	}),
	sidebar: style({
		border: "2px solid blue",
		width: "30%",
		height: "100%",
	}),
	contents: style({
		border: "2px solid #FF00FF",
		width: "100%",
		height: "100%",
	}),
};
