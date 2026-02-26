// src/supabase/supabase.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseClientProvider } from './supabase.client';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseClientProvider, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
