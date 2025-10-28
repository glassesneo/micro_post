import type { PostType } from "@micro_post/shared";
import { Fragment, type ReactNode, use, useRef, useState } from "react";
import { deletePost, editPost, getPostList } from "../api/Post";
import { PostListContext } from "../contexts/PostListContext";
import { UserContext } from "../contexts/UserContext";
import { getDateStr } from "../utils/date";
import { dialog_styles, post_styles } from "./styles.css";

export const Post = ({ post }: { post: PostType }) => {
	const { userInfo } = use(UserContext);
	const { setPostList } = use(PostListContext);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [editContent, setEditContent] = useState("");

	const onEditClick = () => {
		setEditContent(post.content);
		dialogRef.current?.showModal();
	};

	const onSaveClick = async () => {
		await editPost(userInfo.accessToken, {
			post_id: post.id,
			message: editContent,
		});
		const currentPostList = await getPostList(userInfo.accessToken);
		setPostList(currentPostList);
		dialogRef.current?.close();
	};

	const onCancelClick = () => {
		dialogRef.current?.close();
	};

	const onDeleteClick = async () => {
		await deletePost(userInfo.accessToken, post.id);
		const currentPostList = await getPostList(userInfo.accessToken);
		setPostList(currentPostList);
	};

	const getLines = (src: string): ReactNode => {
		return src.split("\n").map((line, index) => {
			return (
				// biome-ignore lint: TODO
				<Fragment key={index}>
					{line}
					<br />
				</Fragment>
			);
		});
	};

	const isEdited =
		post.updated_at && post.updated_at.getTime() !== post.created_at.getTime();

	return (
		<div className={post_styles.item}>
			<div className={post_styles.metaRow}>
				<span className={post_styles.user}>{post.user_name}</span>
				<span>{getDateStr(post.created_at)}</span>
				{isEdited && <span className={post_styles.editedLabel}>(edited)</span>}
				<button
					className={post_styles.editButton}
					type="button"
					onClick={onEditClick}
				>
					Edit
				</button>
				<button
					className={post_styles.deleteButton}
					type="button"
					onClick={onDeleteClick}
				>
					Delete
				</button>
			</div>
			<div className={post_styles.content}>{getLines(post.content)}</div>

			<dialog ref={dialogRef} className={dialog_styles.dialog}>
				<div className={dialog_styles.content}>
					<textarea
						className={dialog_styles.textarea}
						value={editContent}
						onChange={(e) => setEditContent(e.target.value)}
						maxLength={280}
					/>
					<div className={dialog_styles.footer}>
						<span className={dialog_styles.charCounter}>
							{editContent.length}/280
						</span>
						<div className={dialog_styles.actions}>
							<button
								className={dialog_styles.cancelButton}
								type="button"
								onClick={onCancelClick}
							>
								Cancel
							</button>
							<button
								className={dialog_styles.saveButton}
								type="button"
								onClick={onSaveClick}
								disabled={editContent.trim().length === 0}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</div>
	);
};
