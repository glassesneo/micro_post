import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../entities/auth";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;
	let userRepo: jest.Mocked<Repository<User>>;
	let authRepo: jest.Mocked<Repository<Auth>>;

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
				{
					provide: getRepositoryToken(Auth),
					useValue: {
						findOne: jest.fn(),
						save: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userRepo = module.get(getRepositoryToken(User));
		authRepo = module.get(getRepositoryToken(Auth));
	});

	it("should login and refresh token expiry", async () => {
		userRepo.findOne.mockResolvedValue({
			id: 1,
			name: "alice",
			hash: "hash",
			email: "alice@example.com",
			created_at: new Date(),
			updated_at: new Date(),
		});
		authRepo.findOne.mockResolvedValue({
			id: 1,
			user_id: 1,
			token: "t",
			expire_at: new Date(Date.now() + 86400000),
			created_at: new Date(),
			updated_at: new Date(),
		});
		authRepo.save.mockResolvedValue({
			id: 1,
			user_id: 1,
			token: "t",
			expire_at: new Date(Date.now() + 86400000),
			created_at: new Date(),
			updated_at: new Date(),
		});

		const res = await service.getAuth("alice", "password");
		expect(authRepo.save).toHaveBeenCalledTimes(1);
		expect(res).toEqual({ token: "t", user_id: 1 });
	});
});
