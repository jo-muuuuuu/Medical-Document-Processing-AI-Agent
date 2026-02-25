import { createClient } from "./client";

export async function uploadDocumentToSupabase(file: File, userId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // upload files to bucket
  const { data, error } = await createClient()
    .storage.from("medical-documents-bucket")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  // console.log(data.path);
  // const response = await fetch(
  //   `http://localhost:3001/medical-documents/download?bucket=medical-documents-bucket&path=${data.path}`,
  // );

  return {
    path: data.path,
    originalName: file.name,
    mimeType: file.type,
  };
}
