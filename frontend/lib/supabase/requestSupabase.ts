import { createClient } from "./client";

export async function fetchDocumentsInfo(paths: string[]): Promise<Map<string, any>> {
  if (!paths.length) return new Map();

  const { data, error } = await createClient()
    .from("medical_documents")
    .select("*")
    .in("file_url", paths);

  if (error) {
    console.error("Error fetching documents info:", error);
    throw error;
  }
  console.log("data", data);

  const map = new Map();
  data?.forEach((doc) => map.set(doc.file_url, doc));
  return map;
}

export function getPublicPdfUrl(path: string) {
  const { data } = createClient()
    .storage.from("medical-documents-bucket")
    .getPublicUrl(path);

  return data.publicUrl;
}
