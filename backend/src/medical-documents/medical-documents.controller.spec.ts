import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDocumentsController } from './medical-documents.controller';

describe('MedicalDocumentsController', () => {
  let controller: MedicalDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalDocumentsController],
    }).compile();

    controller = module.get<MedicalDocumentsController>(MedicalDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
