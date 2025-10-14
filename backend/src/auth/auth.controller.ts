import { type LoginDto, type SignupDto } from "@micro_post/shared";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	async signup(@Body() signupDto: SignupDto) {
		return await this.authService.register(
			signupDto.name,
			signupDto.email,
			signupDto.password,
		);
	}

	@Post("login")
	async login(@Body() loginDto: LoginDto) {
		return await this.authService.login(loginDto.name, loginDto.password);
	}
}
