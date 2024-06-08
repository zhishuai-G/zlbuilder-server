import { Test, TestingModule } from '@nestjs/testing';
import { DataBaseController } from './data-base.controller';
import { DataBaseService } from './data-base.service';

describe('DataBaseController', () => {
  let controller: DataBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataBaseController],
      providers: [DataBaseService],
    }).compile();

    controller = module.get<DataBaseController>(DataBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
