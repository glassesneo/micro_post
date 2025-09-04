import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../entities/auth";
import { MicroPost } from "../entities/microposts";
import { PostService } from "./post.service";

describe("PostService", () => {
	let service: PostService;
	let microRepo: jest.Mocked<Repository<MicroPost>>;
	let authRepo: jest.Mocked<Repository<Auth>>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PostService,
				{
					provide: getRepositoryToken(MicroPost),
					useValue: {
						save: jest.fn(),
						createQueryBuilder: jest.fn(),
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

		service = module.get<PostService>(PostService);
		microRepo = module.get(getRepositoryToken(MicroPost));
		authRepo = module.get(getRepositoryToken(Auth));
	});

	it("should create a post", async () => {
		authRepo.findOne.mockResolvedValue({
			id: 1,
			user_id: 1,
			token: "tok",
			expire_at: new Date(Date.now() + 86400000),
			created_at: new Date(),
			updated_at: new Date(),
		});
		microRepo.save.mockResolvedValue({
			id: 1,
			user_id: 1,
			content: "msg",
			created_at: new Date(),
			updated_at: new Date(),
		});
		await service.createPost("msg", "tok");
		expect(microRepo.save).toHaveBeenCalledWith({ user_id: 1, content: "msg" });
	});
});
