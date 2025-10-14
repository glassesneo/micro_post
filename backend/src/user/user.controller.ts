import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Post()
	async createUser(
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		await this.userService.createUser(name, email, password);
	}

	@Get(":id")
	async getUser(@Param("id") id: number) {
		return await this.userService.getUser(id);
	}
}
