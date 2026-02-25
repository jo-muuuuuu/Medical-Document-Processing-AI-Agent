import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentAnalysisClient,
  AzureKeyCredential,
} from '@azure/ai-form-recognizer';

@Injectable()
export class AzureOcrService {
  private client: DocumentAnalysisClient;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>(
      'AZURE_DOC_INTELLIGENCE_ENDPOINT',
    );
    const key = this.configService.get<string>('AZURE_DOC_INTELLIGENCE_KEY');

    if (!endpoint || !key) {
      throw new Error('Azure Document Intelligence env missing');
    }

    this.client = new DocumentAnalysisClient(
      endpoint,
      new AzureKeyCredential(key),
    );
  }

  // OCR text extraction
  async extractText(buffer: Buffer): Promise<string> {
    const poller = await this.client.beginAnalyzeDocument(
      'prebuilt-read',
      buffer,
    );

    const result = await poller.pollUntilDone();

    let text = '';
    for (const page of result.pages ?? []) {
      for (const line of page.lines ?? []) {
        text += line.content + '\n';
      }
    }

    return text;
  }
}
