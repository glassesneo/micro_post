import { UserResponseDto } from "@micro_post/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Equal, Repository } from "typeorm";
import { User } from "../entities/user.entity";

const toUserResponseDto = (user: User): UserResponseDto => {
	return {
		name: user.name,
		id: user.id,
		email: user.email,
		// biome-ignore lint: dates are filled in DB
		created_at: user.created_at!.toISOString(),
		// biome-ignore lint: dates are filled in DB
		updated_at: user.updated_at!.toISOString(),
	};
};

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async createUser(name: string, email: string, password: string) {
		const hashedPassword = await bcrypt.hash(password, 10);
		const record = {
			name: name,
			email: email,
			password_hash: hashedPassword,
		};

		await this.userRepository.save(record);
	}

	async getUser(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id: Equal(id),
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return toUserResponseDto(user);
	}
}
