import { use, useRef, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

export const ProfileModal = ({
	buttonTitle,
	userName,
}: {
	buttonTitle: string;
	userName: string;
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { profile, setProfile } = use(ProfileContext);
	const [name, setName] = useState(userName);
	console.log(`name: ${name}`);

	const close = () => {
		setName(name);
		dialogRef.current?.close();
	};

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					dialogRef.current?.showModal();
				}}
			>
				{buttonTitle}
			</button>

			<dialog
				ref={dialogRef}
				onCancel={() => {
					dialogRef.current?.close();
				}}
			>
				<h2>プロフィールを編集</h2>
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						console.log(`value: ${e.target.value}`);
					}}
				/>
				<button
					type="button"
					className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
					onClick={() => {
						setProfile({ ...profile, name: name });
						close();
					}}
					disabled={name === ""}
				>
					OK
				</button>
				<button
					type="button"
					className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
					onClick={() => {
						close();
					}}
				>
					キャンセル
				</button>
			</dialog>
		</div>
	);
};
