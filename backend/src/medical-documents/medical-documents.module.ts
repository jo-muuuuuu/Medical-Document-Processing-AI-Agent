// src/medical-documents/medical-documents.module.ts
import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { MedicalDocumentsService } from './medical-documents.service';
import { MedicalDocumentsController } from './medical-documents.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [MedicalDocumentsController],
  providers: [MedicalDocumentsService],
})
export class MedicalDocumentsModule {}
