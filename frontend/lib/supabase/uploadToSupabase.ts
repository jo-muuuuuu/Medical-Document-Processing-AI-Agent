import { createClient } from "./client";

export async function uploadDocumentsToSupabase(files: File[], userId: string) {
  const results = [];

  for (const file of files) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // upload files to bucket
    const { data, error } = await createClient()
      .storage.from("medical-documents-bucket")
      .upload(filePath, file);

    if (error) throw error;

    results.push({
      path: data.path,
      originalName: file.name,
      mimeType: file.type,
    });
  }

  const backendResult = await handleUploads(results);

  return {
    uploaded: results,
    processed: backendResult,
  };
}

// async function handleUploads(uploadedDocs: Object[]) {
//   try {
//     const response = await fetch("http://localhost:3001/medical-documents/process", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ documents: uploadedDocs }),
//     });

//     if (!response.ok) {
//       throw new Error(`Backend error: ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log("Backend response:", result);
//     return result;
//   } catch (err: any) {
//     console.error(err);
//   }
// }

async function handleUploads(uploadedDocs: Object[]) {
  try {
    // const response = await fetch("http://localhost:3001/medical-documents/process", {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/medical-documents/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documents: uploadedDocs }),
      },
    );

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Backend response:", result);
    return result;
  } catch (err: any) {
    console.error(err);
  }
}
