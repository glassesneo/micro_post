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
						getAuth: jest.fn().mockResolvedValue({}),
					},
				},
			],
			controllers: [AuthController],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should call service.getAuth", async () => {
		const controller = new AuthController(service);
		await controller.signup({
			name: "user",
			email: "sample@example.com",
			password: "pass",
		});
		expect(service.register).toHaveBeenCalledTimes(1);
	});
});
