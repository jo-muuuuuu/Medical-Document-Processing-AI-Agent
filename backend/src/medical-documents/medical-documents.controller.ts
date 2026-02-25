import { Controller, Post, Body } from '@nestjs/common';
import type { Response } from 'express';
import { MedicalDocumentsService } from './medical-documents.service';

@Controller('medical-documents')
export class MedicalDocumentsController {
  constructor(private readonly service: MedicalDocumentsService) {}

  @Post('process')
  async processDocuments(
    @Body()
    body: {
      documents: {
        path: string;
        mimeType: string;
        originalName: string;
      }[];
    },
  ) {
    if (!body.documents || body.documents.length === 0) {
      return { status: 'no-documents' };
    }

    for (const doc of body.documents) {
      await this.service.processOne(doc);
    }

    return {
      status: 'processing-started',
      count: body.documents.length,
    };
  }
}
