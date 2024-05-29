import { Test, TestingModule } from '@nestjs/testing';
import { PageJsonController } from './page-json.controller';
import { PageJsonService } from './page-json.service';

describe('PageJsonController', () => {
  let controller: PageJsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageJsonController],
      providers: [PageJsonService],
    }).compile();

    controller = module.get<PageJsonController>(PageJsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
