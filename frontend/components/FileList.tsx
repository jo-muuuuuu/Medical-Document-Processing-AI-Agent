"use client";

interface FileListProps {
  files: File[];
  onRemove?: (index: number) => void;
  showRemove?: boolean;
  onSelect?: (index: number) => void;
  selectedIndex?: number | null;
}

export default function FileList({
  files,
  onRemove,
  showRemove = false,
  onSelect,
  selectedIndex = null,
}: FileListProps) {
  if (files.length === 0) {
    return <p className="text-sm text-gray-500">No files</p>;
  }

  return (
    <ul className="space-y-1 text-sm">
      {files.map((file, idx) => {
        const isSelected = selectedIndex === idx;

        return (
          <li
            key={idx}
            onClick={onSelect ? () => onSelect(idx) : undefined}
            className={`flex items-center justify-between border rounded px-2 py-1
              ${onSelect ? "cursor-pointer hover:bg-gray-100" : ""}
              ${isSelected ? "bg-blue-100 border-blue-400" : "border-gray-300"}
            `}
          >
            <span className="truncate">{file.name}</span>

            {showRemove && onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(idx);
                }}
                className="ml-2 text-red-500 hover:text-red-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
