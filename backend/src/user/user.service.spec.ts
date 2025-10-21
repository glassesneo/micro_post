import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

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
		(mockedBcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");

		userRepo.save.mockResolvedValue({
			id: 1,
			name: "alice",
			password_hash: "hashed_password",
			email: "a@example.com",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});
		await service.createUser("alice", "a@example.com", "secret");
		expect(mockedBcrypt.hash).toHaveBeenCalledWith("secret", 10);
		expect(userRepo.save).toHaveBeenCalledWith({
			name: "alice",
			email: "a@example.com",
			password_hash: "hashed_password",
		});
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
