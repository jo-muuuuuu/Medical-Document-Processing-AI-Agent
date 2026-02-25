// src/medical-documents/medical-documents.module.ts
import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { MedicalDocumentsService } from './medical-documents.service';
import { MedicalDocumentsController } from './medical-documents.controller';
import { AzureOcrModule } from 'src/azure-ocr/azure-ocr-module';

@Module({
  imports: [SupabaseModule, AzureOcrModule],
  controllers: [MedicalDocumentsController],
  providers: [MedicalDocumentsService],
})
export class MedicalDocumentsModule {}
