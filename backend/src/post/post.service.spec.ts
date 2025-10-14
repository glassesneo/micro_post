import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MicroPost } from "../entities/microposts";
import { PostService } from "./post.service";

describe("PostService", () => {
	let service: PostService;
	let microRepo: jest.Mocked<Repository<MicroPost>>;

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
			],
		}).compile();

		service = module.get<PostService>(PostService);
		microRepo = module.get(getRepositoryToken(MicroPost));
	});

	it("should create a post", async () => {
		await service.createPost("msg", 1);
		expect(microRepo.save).toHaveBeenCalledWith({ user_id: 1, content: "msg" });
	});
});
