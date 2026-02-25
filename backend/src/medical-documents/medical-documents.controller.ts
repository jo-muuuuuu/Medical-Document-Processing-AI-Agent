import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { MedicalDocumentsService } from './medical-documents.service';

@Controller('medical-documents')
export class MedicalDocumentsController {
  constructor(private readonly service: MedicalDocumentsService) {}

  @Get('download')
  async download(
    @Query('bucket') bucket: string,
    @Query('path') path: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const buffer = await this.service.getFile(bucket, path);
    // res.send(buffer);
    console.log(buffer);
  }
}
