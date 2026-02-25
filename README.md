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
