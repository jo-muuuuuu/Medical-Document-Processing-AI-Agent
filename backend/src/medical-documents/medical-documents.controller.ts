import { Controller, Post, Body } from '@nestjs/common';
import type { Response } from 'express';
import { MedicalDocumentsService } from './medical-documents.service';

interface ProcessResult {
  success: boolean;
  id?: string;
  path: string;
  extraction?: any;
  error?: string;
}

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

    const results: ProcessResult[] = [];

    for (const doc of body.documents) {
      try {
        const res = await this.service.processOne(doc);
        results.push({ ...res, success: true, path: res?.path ?? doc.path });
      } catch (err) {
        console.error('Error processing document:', doc.originalName, err);
        results.push({
          success: false,
          path: doc.path,
          error: err.message || 'Unknown error',
        });
      }
    }

    return {
      status: 'completed',
      count: results.length,
      results,
    };
  }
}
