import { Inject, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AzureOcrService } from '../azure-ocr/azure-ocr.service';
import { GeminiService } from '../gemini/gemini.service';
import * as mammoth from 'mammoth';

@Injectable()
export class MedicalDocumentsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly azureOcrService: AzureOcrService,
    private readonly geminiService: GeminiService,
  ) {}

  // Process Documents
  async processOne(doc: {
    path: string;
    mimeType: string;
    originalName: string;
  }) {
    // console.log('[PROCESS]', doc.originalName);

    // download files
    const buffer = await this.supabaseService.downloadFromSupabase(
      'medical-documents-bucket',
      doc.path,
    );

    // OCR - Azure Document Intelligence
    let extractedText = '';

    if (doc.mimeType === 'application/pdf') {
      extractedText = await this.azureOcrService.extractText(buffer);
    } else if (
      doc.mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else {
      console.warn('Unsupported mimeType:', doc.mimeType);
      return;
    }
    // console.log('OCR text length:', extractedText.length);

    // Gemini 2.5 Flash model
    const samanthaResult =
      await this.geminiService.analyzeMedicalText(extractedText);
    // console.log('[SAMANTHA] Extraction complete:', samanthaResult);

    // Write into Supabase
    const dbPayload = {
      patient_name: samanthaResult.patientName,
      date_of_report: samanthaResult.dateOfReport,
      subject: samanthaResult.subject,
      contact_of_source: samanthaResult.contactOfSource,
      store_in: samanthaResult.storeIn,
      doctor_name: samanthaResult.doctorName,
      category: samanthaResult.category,
      file_url: doc.path,
      raw_ocr_text: extractedText,
      status: 'pending_review',
    };

    const savedRecord = await this.supabaseService.writeIntoSupabase(
      'medical_documents',
      dbPayload,
    );

    // console.log('[DATABASE] Record saved with ID:', savedRecord.id);

    return {
      id: savedRecord.id,
      path: doc.path,
      extraction: samanthaResult,
    };
  }
}
