"use client";

interface ImportedListProps {
  patientName: string;
  dateOfReport: string;
  subject: string;
}

export default function ImportedList({
  patientName,
  dateOfReport,
  subject,
}: ImportedListProps) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white space-y-2 mx-3">
      <div className="text-sm ">
        <p>
          <span className="font-medium">Patient:</span> {patientName || "-"}
        </p>

        <p>
          <span className="font-medium">Date:</span> {dateOfReport || "-"}
        </p>

        <p>
          <span className="font-medium">Subject:</span> {subject || "-"}
        </p>
      </div>
    </div>
  );
}
