import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class MicroPost {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@ManyToOne(
		() => User,
		(user) => user.posts,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn({ name: "user_id" })
	user: User;

	@Column()
	user_id: number;

	@Column()
	content: string;

	@CreateDateColumn()
	readonly created_at?: Date;

	@UpdateDateColumn()
	readonly updated_at?: Date;
}
