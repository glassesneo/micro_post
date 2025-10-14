import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService,
	) {}

	async login(name: string, password: string) {
		const user = await this.userRepository.findOne({
			where: { name },
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password_hash);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const payload = { sub: user.id, name: user.name, email: user.email };

		return {
			access_token: this.jwtService.sign(payload),
			user_id: user.id,
		};
	}

	async register(name: string, email: string, password: string) {
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = this.userRepository.create({
			name,
			email,
			password_hash: hashedPassword,
		});

		await this.userRepository.save(user);

		const payload = { sub: user.id, name: user.name, email: user.email };

		return {
			access_token: this.jwtService.sign(payload),
			user_id: user.id,
		};
	}
}
