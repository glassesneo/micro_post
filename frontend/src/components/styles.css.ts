import { style } from "@vanilla-extract/css";

export const common_styles = {
	header: style({
		width: "100%",
		height: 32,
		// border: "2px solid red",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 12,
		paddingRight: 12,
		boxSizing: "border-box",
	}),
	body: style({
		width: "100%",
		height: "calc(100vh - 32px)",
		// border: "2px solid green",
		display: "flex",
		flexDirection: "row",
	}),
	sidebar: style({
		// border: "2px solid blue",
		width: "30%",
		height: "100%",
		padding: 12,
		boxSizing: "border-box",
	}),
	contents: style({
		// border: "2px solid #FF00FF",
		width: "100%",
		height: "100%",
		padding: 12,
		boxSizing: "border-box",
		overflowY: "auto",
	}),
};

export const sign_in_styles = {
	frame: style({
		backgroundColor: "#f8f8f8",
		margin: "80px auto",
		padding: "24px 32px 24px 32px",
		borderRadius: 10,
		boxShadow: "0 8px 24px #aaaaaa33",
		width: 340,
		display: "flex",
		flexDirection: "column",
		gap: 16,
	}),
	row: style({
		display: "flex",
		alignItems: "center",
		marginBottom: 12,
	}),
	label: style({
		width: 70,
		fontWeight: 500,
		color: "#444",
		marginRight: 8,
	}),
	input: style({
		flex: 1,
		padding: 6,
		border: "1px solid #ccc",
		borderRadius: 4,
	}),
	button: style({
		backgroundColor: "#444444",
		color: "#f0f0f0",
		padding: "6px 0",
		borderRadius: 8,
		fontSize: 15,
		marginTop: 8,
	}),
};

export const form_styles = {
	input: style({
		width: "70%",
		padding: 6,
		border: "1px solid #ccc",
		borderRadius: 4,
	}),
	textarea: style({
		width: "100%",
		padding: 6,
		border: "1px solid #ccc",
		borderRadius: 4,
		resize: "vertical",
	}),
	button: style({
		padding: "6px 12px",
		border: "1px solid #ccc",
		borderRadius: 4,
		backgroundColor: "#fff",
		cursor: "pointer",
		selectors: {
			"&:hover": { backgroundColor: "#f5f5f5" },
		},
	}),
};

export const header_styles = {
	title: style({
		fontWeight: 700,
	}),
	user: style({
		color: "#444",
	}),
};

export const sidebar_styles = {
	section: style({
		marginBottom: 12,
	}),
	profile: style({
		marginBottom: 8,
		color: "#333",
	}),
};

export const post_styles = {
	list: style({
		display: "flex",
		flexDirection: "column",
		gap: 8,
	}),
	item: style({
		border: "1px solid #e5e5e5",
		borderRadius: 6,
		padding: 12,
		backgroundColor: "#fff",
	}),
	metaRow: style({
		display: "flex",
		gap: 8,
		color: "#666",
		fontSize: 12,
		marginBottom: 8,
		alignItems: "center",
	}),
	user: style({
		fontWeight: 600,
		color: "#333",
	}),
	content: style({
		lineHeight: 1.6,
	}),
	editButton: style({
		background: "none",
		border: "none",
		color: "#0066cc",
		cursor: "pointer",
		fontSize: 14,
		padding: 4,
		borderRadius: 4,
		transition: "background 0.2s, color 0.2s",
		":hover": {
			background: "#e6f2ff",
			color: "#0052a3",
		},
	}),
	deleteButton: style({
		background: "none",
		border: "none",
		color: "#c00",
		cursor: "pointer",
		fontSize: 14,
		padding: 4,
		borderRadius: 4,
		transition: "background 0.2s, color 0.2s",
		":hover": {
			background: "#fbeaea",
			color: "#a00",
		},
	}),
	editedLabel: style({
		fontSize: 11,
		color: "#999",
		fontStyle: "italic",
	}),
};

export const dialog_styles = {
	dialog: style({
		border: "none",
		borderRadius: 8,
		padding: 0,
		maxWidth: 500,
		width: "90%",
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
		selectors: {
			"&::backdrop": {
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			},
		},
	}),
	content: style({
		padding: 20,
		display: "flex",
		flexDirection: "column",
		gap: 16,
	}),
	textarea: style({
		width: "100%",
		minHeight: 100,
		padding: 8,
		border: "1px solid #ccc",
		borderRadius: 4,
		resize: "vertical",
		fontFamily: "inherit",
		fontSize: 14,
		lineHeight: 1.5,
		boxSizing: "border-box",
	}),
	footer: style({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	}),
	charCounter: style({
		fontSize: 12,
		color: "#666",
	}),
	actions: style({
		display: "flex",
		gap: 8,
	}),
	cancelButton: style({
		padding: "6px 16px",
		border: "1px solid #ccc",
		borderRadius: 4,
		backgroundColor: "#fff",
		cursor: "pointer",
		fontSize: 14,
		":hover": {
			backgroundColor: "#f5f5f5",
		},
	}),
	saveButton: style({
		padding: "6px 16px",
		border: "none",
		borderRadius: 4,
		backgroundColor: "#0066cc",
		color: "#fff",
		cursor: "pointer",
		fontSize: 14,
		":hover": {
			backgroundColor: "#0052a3",
		},
		":disabled": {
			backgroundColor: "#ccc",
			cursor: "not-allowed",
		},
	}),
};
