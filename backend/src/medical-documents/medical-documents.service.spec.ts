import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDocumentsService } from './medical-documents.service';

describe('MedicalDocumentsService', () => {
  let service: MedicalDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalDocumentsService],
    }).compile();

    service = module.get<MedicalDocumentsService>(MedicalDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
