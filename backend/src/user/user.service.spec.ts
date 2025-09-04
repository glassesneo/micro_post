import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../entities/auth";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
	let service: UserService;
	let userRepo: jest.Mocked<Repository<User>>;
	let authRepo: jest.Mocked<Repository<Auth>>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						save: jest.fn(),
						findOne: jest.fn(),
					},
				},
				{
					provide: getRepositoryToken(Auth),
					useValue: {
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepo = module.get(getRepositoryToken(User));
		authRepo = module.get(getRepositoryToken(Auth));
	});

	it("should create a user", async () => {
		userRepo.save.mockResolvedValue({
			id: 1,
			name: "alice",
			hash: "hash",
			email: "a@example.com",
			created_at: new Date(),
			updated_at: new Date(),
		});
		service.createUser("alice", "a@example.com", "secret");
		expect(userRepo.save).toHaveBeenCalledTimes(1);
	});

	it("should get a user", async () => {
		authRepo.findOne.mockResolvedValue({
			id: 1,
			user_id: 1,
			token: "tok",
			expire_at: new Date(Date.now() + 86400000),
			created_at: new Date(),
			updated_at: new Date(),
		});
		userRepo.findOne.mockResolvedValue({
			id: 1,
			name: "alice",
			hash: "hash",
			email: "a@example.com",
			created_at: new Date(),
			updated_at: new Date(),
		});
		const res = await service.getUser("tok", 1);
		expect(res).toEqual({
			id: 1,
			name: "alice",
			hash: "hash",
			email: "a@example.com",
			created_at: expect.any(Date),
			updated_at: expect.any(Date),
		});
	});
});
