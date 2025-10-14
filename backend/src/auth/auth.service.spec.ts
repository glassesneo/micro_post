import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;
	let userRepo: jest.Mocked<Repository<User>>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userRepo = module.get(getRepositoryToken(User));
	});

	it("should login and refresh token expiry", async () => {
		userRepo.findOne.mockResolvedValue({
			id: 1,
			name: "alice",
			password_hash: "hash",
			email: "alice@example.com",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});

		const res = await service.login("alice", "password");
		expect(res).toEqual({ access_token: "t", user_id: 1 });
	});
});
