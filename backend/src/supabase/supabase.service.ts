import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  // Download files from Supabase Bucket
  async downloadFromSupabase(bucket: string, path: string): Promise<Buffer> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(path);

    if (error) {
      throw new Error(`Supabase download failed: ${error.message}`);
    }

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  // Write the Gemini text extraction results into DB
  async writeIntoSupabase(tableName: string, data: any) {
    const { data: insertedData, error } = await this.supabase
      .from(tableName)
      .insert([data])
      .select();

    if (error) {
      console.error('[SUPABASE ERROR]', error);
      throw new Error(`Supabase insert failed: ${error.message}`);
    }

    return insertedData[0];
  }
}
