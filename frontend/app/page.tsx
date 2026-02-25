"use client";

import { useState, useRef } from "react";
import Uploader, { UploaderRef } from "@/components/Uploader";
import { uploadDocumentsToSupabase } from "../lib/supabase/uploadToSupabase";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [queueFiles, setQueueFiles] = useState<File[]>([]);

  const uploaderRef = useRef<UploaderRef>(null);

  // Toggle display
  const handleFilesChange = (files: File[]) => {
    setQueueFiles(files);
    setExpanded(files.length > 0);
  };

  // Remove file from import queue
  const handleRemoveFile = (index: number) => {
    setQueueFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) {
        setExpanded(false);
      }
      return updated;
    });
  };

  // trigger upload btn in right column
  const handleAddDocumentsClick = () => {
    uploaderRef.current?.openFileSelector();
  };

  // Upload files to supabase bucket
  const handleUploadAll = async () => {
    try {
      // for (const file of queueFiles) {
      await uploadDocumentsToSupabase(queueFiles, "0");
      // }

      alert("Upload successful");
      setQueueFiles([]);
      setExpanded(false);

      // clear files in Uploader
      uploaderRef.current?.clearFiles();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex-1 grid grid-cols-24">
      {/* Left: Import Queue and Imported Documents */}
      <div className="col-span-8 text-center border-r border-blue-500">
        <button
          className="bg-blue-800 rounded text-white px-4 py-2 my-3"
          style={{ width: "95%" }}
          onClick={handleAddDocumentsClick}
        >
          {expanded ? "Add More Documents" : "Upload Documents"}
        </button>

        {/* Import Queue Section */}
        <div className="h-[40vh] border-b border-gray-400 overflow-auto p-2">
          <h2 className="font-bold mb-2">Import Queue</h2>
          {queueFiles.length === 0 ? (
            <p className="text-sm text-gray-500">No files in queue</p>
          ) : (
            <div>
              <ul className="space-y-2 text-left text-sm">
                {queueFiles.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border rounded px-2 py-1"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUploadAll}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
              >
                Upload to System
              </button>
            </div>
          )}
        </div>

        <div className="mt-3">
          <h2 className="font-bold">Imported Documents</h2>
        </div>
      </div>

      {/* Middle:  */}
      {/* No file in queue -> upload  */}
      {/* files uploaded -> PDF view  */}
      <div
        className={`${
          expanded ? "col-span-8" : "col-span-16"
        } flex justify-center items-center`}
      >
        <div className="w-full relative">
          {/* Uploader - always rendered for using the upload button in the left column*/}
          <div className={expanded ? "opacity-0 pointer-events-none" : ""}>
            <Uploader ref={uploaderRef} onFilesChange={handleFilesChange} />
          </div>

          {/* PDF Viewer - overlays when expanded */}
          {expanded && (
            <div className="absolute inset-0 flex justify-center items-center">
              PDF VIEW PLACEHOLDER
            </div>
          )}
        </div>
      </div>

      {/* Right: */}
      {/* No file in queue -> hidden */}
      {/* files uploaded -> Document Information  */}
      {expanded && (
        <div className="col-span-8 text-center h-full border-l border-blue-500">
          <h2 className="mt-2 font-bold">Document Information</h2>
        </div>
      )}
    </div>
  );
}
