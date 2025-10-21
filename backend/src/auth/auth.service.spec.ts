import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";

jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

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
						create: jest.fn(),
						save: jest.fn(),
					},
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn().mockReturnValue("mocked_jwt_token"),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userRepo = module.get(getRepositoryToken(User));
	});

	it("should login and return JWT token", async () => {
		(mockedBcrypt.compare as jest.Mock).mockResolvedValue(true);
		userRepo.findOne.mockResolvedValue({
			id: 1,
			name: "alice",
			password_hash: "hashed_password",
			email: "alice@example.com",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});

		const res = await service.login("alice", "password");
		expect(res).toEqual({ access_token: "mocked_jwt_token", user_id: 1 });
	});

	it("should register a new user and return JWT token", async () => {
		(mockedBcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
		userRepo.create.mockReturnValue({
			id: 1,
			name: "bob",
			email: "bob@example.com",
			password_hash: "hashed_password",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});
		userRepo.save.mockResolvedValue({
			id: 1,
			name: "bob",
			email: "bob@example.com",
			password_hash: "hashed_password",
			posts: [],
			created_at: new Date(),
			updated_at: new Date(),
		});

		const res = await service.register("bob", "bob@example.com", "password");

		expect(res).toEqual({
			access_token: "mocked_jwt_token",
			user_id: 1,
		});
		expect(mockedBcrypt.hash).toHaveBeenCalledWith("password", 10);
	});
});
