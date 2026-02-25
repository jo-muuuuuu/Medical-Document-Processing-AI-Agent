import { Inject, Injectable } from '@nestjs/common';
// import { supabase } from '../lib/supabase.client';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class MedicalDocumentsService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async getFile(bucket: string, path: string): Promise<Buffer> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(path);
    if (error) throw error;

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
