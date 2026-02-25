"use client";

import { useState } from "react";

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex-1 grid grid-cols-24">
      <div
        className="col-span-8 text-center"
        style={{ borderRight: "1px solid #0095ff" }}
      >
        <button
          className="bg-blue-800 rounded text-white px-4 py-2 my-3 "
          style={{ width: "95%" }}
          onClick={() => setExpanded(!expanded)}
        >
          Upload Documents
        </button>

        <div style={{ height: "40vh", borderBottom: "1px solid gray" }}>Import Queue</div>
        <div>Imported Documents</div>
      </div>

      <div className={`${expanded ? "col-span-8" : "col-span-16"}`}>
        {expanded ? (
          <></>
        ) : (
          <div className="flex justify-center items-center h-full">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Upload Documents
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div
          className="col-span-8 text-center h-full"
          style={{ borderLeft: "1px solid #0095ff" }}
        >
          Document Information
        </div>
      )}
    </div>
  );
}
