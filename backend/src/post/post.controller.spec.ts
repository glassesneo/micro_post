import { Test, TestingModule } from "@nestjs/testing";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

describe("PostController", () => {
	let service: PostService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: PostService,
					useValue: {
						createPost: jest.fn().mockResolvedValue(undefined),
						getList: jest.fn().mockResolvedValue([]),
					},
				},
			],
			controllers: [PostController],
		}).compile();

		service = module.get<PostService>(PostService);
	});

	it("should delegate to service", async () => {
		const controller = new PostController(service);
		await controller.createPost("hello", "token");
		await controller.getList("token", 0, 10);
		expect(service.createPost).toHaveBeenCalledTimes(1);
		expect(service.getList).toHaveBeenCalledTimes(1);
	});
});
