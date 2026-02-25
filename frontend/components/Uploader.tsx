"use client";

import { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";

interface UploaderProps {
  onFilesChange?: (files: File[]) => void;
}

// Define ref type for exposing methods
export interface UploaderRef {
  openFileSelector: () => void;
  clearFiles: () => void;
}

export default forwardRef<UploaderRef, UploaderProps>(function Uploader(
  { onFilesChange },
  ref,
) {
  const [files, setFiles] = useState<File[]>([]);

  // Handle file drop/selection - filters for PDF and DOCX only
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter to only allow PDF and DOCX files
      const allowedFiles = acceptedFiles.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      const newFiles = [...files, ...allowedFiles];
      setFiles(newFiles);

      // Notify parent component of file changes if callback provided
      if (onFilesChange) {
        onFilesChange(newFiles);
      }
    },
    [files, onFilesChange],
  );

  // Configure react-dropzone hook
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true, // Allow multiple file selection
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    noClick: true, // Disable click-to-open (we handle with custom button)
    noKeyboard: true, // Disable keyboard activation
  });

  // Expose open method to parent component via ref
  useImperativeHandle(ref, () => ({
    openFileSelector: open,
    clearFiles: () => {
      setFiles([]);
      onFilesChange?.([]);
    },
  }));

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      {/* Dropzone area - handles drag & drop */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-default
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your PDF or DOCX files here...</p>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">No documents selected</h2>
            <p className="text-sm mb-4">
              Drag files here or click the button below to select files
            </p>
            {/* Custom file selection button */}
            <button
              type="button"
              onClick={open}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Select Documents
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
