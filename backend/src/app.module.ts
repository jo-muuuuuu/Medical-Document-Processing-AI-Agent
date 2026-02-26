import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { MedicalDocumentsModule } from './medical-documents/medical-documents.module';
import { SupabaseClientProvider } from './supabase/supabase.client';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    MedicalDocumentsModule,
  ],
  providers: [AppService, SupabaseClientProvider],
  exports: [SupabaseClientProvider],
})
export class AppModule {}
