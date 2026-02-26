"use client";

import { useState } from "react";
import Uploader from "@/components/Uploader";
import FileList from "@/components/FileList";
import { uploadDocumentsToSupabase } from "../lib/supabase/uploadToSupabase";
import { fetchDocumentsInfo } from "@/lib/supabase/requestSupabase";
import DocumentForm from "@/components/DocumentForm";
import ConfirmUploadModal from "@/components/ConfirmUploadModal";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [queueFiles, setQueueFiles] = useState<File[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const [importedDocs, setImportedDocs] = useState<any[]>([]);
  const [selectedDocIndex, setSelectedDocIndex] = useState<number | null>(null);

  const handleFilesChange = (files: File[]) => {
    setQueueFiles((prev) => {
      const allFiles = [...prev, ...files];

      const uniqueFiles = Array.from(
        new Map(allFiles.map((f) => [f.name + f.lastModified, f])).values(),
      );

      return uniqueFiles;
    });

    // Toggle display
    setExpanded(files.length > 0);

    if (files.length > 0) {
      setShowConfirmModal(true);
    }
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

  const handleUploadAll = async () => {
    try {
      setIsProcessing(true);

      // Upload files to supabase bucket
      const { uploaded } = await uploadDocumentsToSupabase(queueFiles, "0");

      // Get file path & fetch extracted text
      const paths = uploaded.map((item) => item.path);
      const infoMap = await fetchDocumentsInfo(paths);

      // Merge upload data with extracted text
      const newDocs = uploaded.map((item) => ({
        path: item.path,
        originalName: item.originalName,
        info: infoMap.get(item.path) || null,
      }));

      setImportedDocs((prev) => {
        const updated = [...prev, ...newDocs];
        return updated;
      });

      // Select the last processed file
      setSelectedDocIndex(importedDocs.length);

      setShowConfirmModal(false);
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
      setIsProcessing(false);
      setShowConfirmModal(false);
    }
  };

  const handleCancelUpload = () => {
    setQueueFiles([]);
    setExpanded(false);
    setShowConfirmModal(false);
  };

  return (
    <div className="flex-1 grid grid-cols-24">
      {/* Left: Import Queue and Imported Documents */}
      <div className="col-span-8 text-center border-r border-blue-500">
        {/* Import Queue Section */}
        <div className="h-[40vh] border-b border-gray-400 overflow-auto p-2">
          <h2 className="font-bold mb-2">Import Queue</h2>
          {queueFiles.length === 0 ? (
            <p className="text-sm text-gray-500">No files in queue</p>
          ) : (
            <FileList
              files={queueFiles}
              showRemove
              onRemove={handleRemoveFile}
              onSelect={(idx) => setSelectedDocIndex(idx)}
              selectedIndex={selectedDocIndex}
            />
          )}
        </div>

        <div className="mt-3">
          <h2 className="font-bold mb-2">Imported Documents</h2>
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
            <Uploader onFilesChange={handleFilesChange} />
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
        <div className="col-span-8 text-center h-full border-l border-blue-500 px-2">
          <h2 className="mt-2 font-bold text-center">Document Information</h2>

          {selectedDocIndex === null ? (
            <p className="text-sm text-gray-500">Select a document to view details</p>
          ) : !importedDocs[selectedDocIndex] ? (
            <p className="text-sm text-gray-500">Document not found</p>
          ) : (
            <div className="p-4 text-left">
              <h3 className="font-semibold mb-2 text-center">
                {importedDocs[selectedDocIndex].originalName}
              </h3>

              {importedDocs[selectedDocIndex].info ? (
                <DocumentForm
                  value={importedDocs[selectedDocIndex].info}
                  onChange={(nextInfo) => {
                    setImportedDocs((prev) => {
                      const updated = [...prev];
                      updated[selectedDocIndex] = {
                        ...updated[selectedDocIndex],
                        info: nextInfo,
                      };
                      return updated;
                    });
                  }}
                />
              ) : (
                <p className="text-sm text-gray-500">
                  Document is still being processed…
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {showConfirmModal && (
        <ConfirmUploadModal
          files={queueFiles}
          handleCancelUpload={handleCancelUpload}
          handleUploadAll={handleUploadAll}
        />
      )}

      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <p className="mb-4 text-gray-700">Processing documents...</p>
            <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
}
