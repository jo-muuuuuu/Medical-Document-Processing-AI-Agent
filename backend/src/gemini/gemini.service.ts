import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VertexAI } from '@google-cloud/vertexai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private vertex: VertexAI;
  private model: any;

  constructor(private readonly configService: ConfigService) {
    const samanthaProjectID = this.configService.get<string>(
      'SAMANTHA_PROJECT_ID',
    );

    if (!samanthaProjectID) {
      console.log('Samantha project ID missing');
      throw new Error('Samantha project ID missing');
    }

    this.vertex = new VertexAI({
      project: samanthaProjectID,
      location: 'us-central1',
    });

    // create gemini 2.5 flash model
    this.model = this.vertex.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
  }

  async analyzeMedicalText(text: string) {
    try {
      const prompt = `
        You are "Samantha", a specialized Medical Document Processing AI Agent. 
        Analyze the following OCR text extracted from a medical document and extract the 7 key properties.

        - patientName
        - dateOfReport (YYYY-MM-DD)
        - subject (e.g., "Ultrasound of left foot")
        - contactOfSource (The sending entity)
        - storeIn (Select "Investigations" for diagnostic reports, "Correspondence" for letters)
        - doctorName (The recipient GP)
        - category (Choose from: [Admissions summary, Advance care planning, Allied health letter, Certificate, Clinical notes, Clinical photograph, Consent form, DAS21, Discharge summary, ECG, Email, Form, Immunisation, Indigenous PIP, Letter, Medical imaging report, MyHealth registration, New PT registration form, Pathology results, Patient consent, Record request, Referral letter, Workcover, Workcover consent])
        
        # OCR text:
        ${text}

        Return ONLY a valid JSON object.
        Do not include markdown, comments, or explanations.
      `;

      const result = await this.model.generateContent(prompt);
      //   const response = result.response;
      const rawText = result.response.candidates[0].content.parts[0].text;

      //   console.log(result);
      console.log(rawText);
    } catch (error) {
      console.error('[GEMINI ERROR]', error);
      console.error('[GEMINI ERROR RAW]', JSON.stringify(error, null, 2));

      throw new InternalServerErrorException(
        'Gemini failed: ' + error?.message,
      );
    }
  }
}
