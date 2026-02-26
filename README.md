# Medical-Document-Processing-AI-Agent

## Setting Up the Frontend with Next.js
#### Command
```
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```
#### UI Template
<img width="3840" height="1905" alt="samantha-ui-template" src="https://github.com/user-attachments/assets/b01085df-7e28-4742-b0fd-66c3d7aecc2b" />

## Setting Up Supabase
#### Command
```
npm install @supabase/supabase-js @supabase/ssr
```

#### Create a Supabase Organization -> Create a Supabase Project -> Get the Credentials
<img width="3840" height="1905" alt="supabase" src="https://github.com/user-attachments/assets/91510100-bf04-43da-92c7-a70b7cd6575a" />

#### Set up Supabase Bucket
<img width="1457" height="795" alt="supabase-bucket" src="https://github.com/user-attachments/assets/5910d034-a3ad-4aa7-8613-d97939766a02" />

#### Skip user auth for MVP
```
create policy "Allow anon uploads to documents bucket"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'medical-documents-bucket'
);
```

## Uploading Files
#### Command
```
npm install react-dropzone
```

#### UI - No Document Selected
<img width="3840" height="1904" alt="upload-1" src="https://github.com/user-attachments/assets/345b785f-9e3c-49a1-9f1e-c030d62569fe" />

#### UI - Documents Selected
<img width="3840" height="1905" alt="upload-2" src="https://github.com/user-attachments/assets/80213c03-9030-4fc3-824e-7cd5e7fa632d" />

## Installing Nest.js & Setting Up the Backend
```
npm install -g @nestjs/cli
```

```
nest new my-nest-app
cd my-nest-app
npm run start:dev
```

## Using Azure Document Intelligence
#### Create a Project
<img width="3840" height="1896" alt="azure" src="https://github.com/user-attachments/assets/e6b4e6bc-50b2-41df-a934-978479de47dd" />

#### Command
```
npm install @azure/ai-form-recognizer
```

## Using Gemini 2.5 Flash
#### Set up a GCP project & a service account
<img width="3840" height="1908" alt="service-account" src="https://github.com/user-attachments/assets/17e2c568-72b2-4e26-a4cd-634e8e4bab64" />

#### Command
```
npm install @google-cloud/vertexai

npm install --save-dev @types/multer
```

## Write Into the Supabase DB
#### Create `medical_documents` table
```
CREATE TABLE medical_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT,
  patient_name TEXT,
  date_of_report DATE,
  subject TEXT,
  contact_of_source TEXT,
  store_in TEXT CHECK (store_in IN ('Investigations', 'Correspondence')),
  doctor_name TEXT,
  category TEXT,
  status TEXT DEFAULT 'pending_review',
  raw_ocr_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

<img width="3840" height="1904" alt="write-supabase" src="https://github.com/user-attachments/assets/aebb3858-47e1-47d9-b95e-e48cd106518e" />

