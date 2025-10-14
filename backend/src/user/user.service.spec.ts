import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
	let service: UserService;
	let userRepo: jest.Mocked<Repository<User>>;

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
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepo = module.get(getRepositoryToken(User));
	});

	it("should create a user", async () => {
		userRepo.save.mockResolvedValue({
			id: 1,
			name: "alice",
			password_hash: "hash",
			email: "a@example.com",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});
		service.createUser("alice", "a@example.com", "secret");
		expect(userRepo.save).toHaveBeenCalledTimes(1);
	});

	it("should get a user", async () => {
		userRepo.findOne.mockResolvedValue({
			id: 1,
			name: "alice",
			password_hash: "hash",
			email: "a@example.com",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});
		const res = await service.getUser(1);
		expect(res).toEqual({
			id: 1,
			name: "alice",
			email: "a@example.com",
			created_at: expect.any(String),
			updated_at: expect.any(String),
		});
	});
});
