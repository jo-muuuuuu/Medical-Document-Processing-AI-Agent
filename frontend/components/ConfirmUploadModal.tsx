"use client";

import FileList from "./FileList";

interface ConfirmUploadModalProps {
  files: File[];
  handleCancelUpload: () => void;
  handleUploadAll: () => Promise<void>;
}

export default function ConfirmUploadModal({
  files,
  handleCancelUpload,
  handleUploadAll,
}: ConfirmUploadModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b font-bold">Confirm Upload</div>

        {/* File list */}
        <div className="p-4 overflow-auto flex-1">
          <p className="text-sm text-gray-600 mb-2">
            You are about to upload the following documents:
          </p>
          <FileList files={files} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t my-3">
          <button
            className="px-4 py-2 text-sm rounded border cursor-pointer"
            onClick={handleCancelUpload}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 text-sm rounded bg-green-600 text-white cursor-pointer"
            onClick={handleUploadAll}
          >
            Confirm Upload
          </button>
        </div>
      </div>
    </div>
  );
}
