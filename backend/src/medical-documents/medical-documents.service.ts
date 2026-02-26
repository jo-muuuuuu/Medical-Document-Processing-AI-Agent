import { Inject, Injectable } from '@nestjs/common';
// import { supabase } from '../lib/supabase.client';
import { SupabaseClient } from '@supabase/supabase-js';
import { AzureOcrService } from '../azure-ocr/azure-ocr.service';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class MedicalDocumentsService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    private readonly azureOcrService: AzureOcrService,
    private readonly geminiService: GeminiService,
  ) {}

  // Process Documents
  async processOne(doc: {
    path: string;
    mimeType: string;
    originalName: string;
  }) {
    console.log('[PROCESS]', doc.originalName);

    // download files
    const buffer = await this.downloadFromSupabase(
      'medical-documents-bucket',
      doc.path,
    );

    // OCR - Azure Document Intelligence
    let extractedText = '';

    if (doc.mimeType === 'application/pdf') {
      extractedText = await this.azureOcrService.extractText(buffer);
    } else {
      console.warn('Unsupported mimeType:', doc.mimeType);
      return;
    }

    console.log('OCR text length:', extractedText.length);

    // Gemini 2.5 Flash model
    const samanthaResult =
      await this.geminiService.analyzeMedicalText(extractedText);

    console.log('[SAMANTHA] Extraction complete:', samanthaResult);

    // TODO: write into db
    return {
      path: doc.path,
      textLength: extractedText.length,
    };
  }

  // Download files from Supabase Bucket
  private async downloadFromSupabase(
    bucket: string,
    path: string,
  ): Promise<Buffer> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(path);

    if (error) {
      console.error('Supabase download error:', error);
      throw error;
    }

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
