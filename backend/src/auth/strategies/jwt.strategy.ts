import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET || "key-change-in-production",
		});
	}

	async validate(payload: { sub: number; name: string; email: string }) {
		const user = await this.userRepository.findOne({
			where: { id: payload.sub },
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
