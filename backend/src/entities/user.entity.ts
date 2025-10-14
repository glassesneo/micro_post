import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { MicroPost } from "./microposts";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column("varchar", { unique: true })
	name: string;

	@Column("varchar")
	password_hash: string;

	@Column("varchar")
	email: string;

	@OneToMany(
		() => MicroPost,
		(post) => post.user,
	)
	posts: MicroPost[];

	@CreateDateColumn()
	readonly created_at?: Date;

	@UpdateDateColumn()
	readonly updated_at?: Date;
}
