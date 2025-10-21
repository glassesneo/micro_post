import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: AuthService,
					useValue: {
						register: jest
							.fn()
							.mockResolvedValue({ access_token: "test_token", user_id: 1 }),
						login: jest
							.fn()
							.mockRejectedValue({ access_token: "test_token", user_id: 1 }),
					},
				},
			],
			controllers: [AuthController],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should call service.register when signup is called", async () => {
		const controller = new AuthController(service);
		await controller.signup({
			name: "user",
			email: "sample@example.com",
			password: "pass",
		});
		expect(service.register).toHaveBeenCalledWith(
			"user",
			"sample@example.com",
			"pass",
		);
	});
});
