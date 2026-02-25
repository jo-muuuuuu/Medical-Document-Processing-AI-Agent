// src/supabase/supabase.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseClientProvider } from './supabase.client';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseClientProvider],
  exports: [SupabaseClientProvider],
})
export class SupabaseModule {}
