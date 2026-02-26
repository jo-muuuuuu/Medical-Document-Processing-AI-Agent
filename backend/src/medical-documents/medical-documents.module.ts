// src/medical-documents/medical-documents.module.ts
import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { MedicalDocumentsService } from './medical-documents.service';
import { MedicalDocumentsController } from './medical-documents.controller';
import { AzureOcrModule } from 'src/azure-ocr/azure-ocr-module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [SupabaseModule, AzureOcrModule, GeminiModule],
  controllers: [MedicalDocumentsController],
  providers: [MedicalDocumentsService],
})
export class MedicalDocumentsModule {}
