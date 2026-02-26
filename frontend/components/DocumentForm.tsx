"use client";

interface DocumentFormProps {
  value: any;
  onChange: (nextValue: any) => void;
}

export default function DocumentForm({ value, onChange }: DocumentFormProps) {
  if (!value) {
    return <p className="text-sm text-gray-500">No document data</p>;
  }

  const updateField = (key: string, fieldValue: any) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Patient Name */}
      <div>
        <label className="block font-medium mb-1">Patient Name</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={value.patient_name || "NULL"}
          onChange={(e) => updateField("patient_name", e.target.value)}
        />
      </div>

      {/* Date of Report */}
      <div>
        <label className="block font-medium mb-1">Date of Report</label>
        <input
          type="date"
          className="w-full border rounded px-2 py-1"
          value={value.date_of_report || "NULL"}
          onChange={(e) => updateField("date_of_report", e.target.value)}
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block font-medium mb-1">Subject</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={value.subject || "NULL"}
          onChange={(e) => updateField("subject", e.target.value)}
        />
      </div>

      {/* Contact of Source */}
      <div>
        <label className="block font-medium mb-1">Contact of Source</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={value.contact_of_source || "NULL"}
          onChange={(e) => updateField("contact_of_source", e.target.value)}
        />
      </div>

      {/* Store In */}
      <div>
        <label className="block font-medium mb-1">Store In</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={value.store_in || "NULL"}
          onChange={(e) => updateField("store_in", e.target.value)}
        >
          <option value="">Select location</option>
          <option value="Correspondence">Correspondence</option>
          <option value="Investigations">Investigations (requires doctor review)</option>
        </select>
      </div>

      {/* Doctor */}
      <div>
        <label className="block font-medium mb-1">Doctor</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={value.doctor_name || "NULL"}
          onChange={(e) => updateField("doctor_name", e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={value.category || "NULL"}
          onChange={(e) => updateField("category", e.target.value)}
        >
          <option value="">Select category</option>

          <option value="Admissions summary">Admissions summary</option>
          <option value="Advance care planning">Advance care planning</option>
          <option value="Allied health letter">Allied health letter</option>
          <option value="Certificate">Certificate</option>
          <option value="Clinical notes">Clinical notes</option>
          <option value="Clinical photograph">Clinical photograph</option>
          <option value="Consent form">Consent form</option>
          <option value="DAS21">DAS21</option>
          <option value="Discharge summary">Discharge summary</option>
          <option value="ECG">ECG</option>
          <option value="Email">Email</option>
          <option value="Form">Form</option>
          <option value="Immunisation">Immunisation</option>
          <option value="Indigenous PIP">Indigenous PIP</option>
          <option value="Letter">Letter</option>
          <option value="Medical imaging report">Medical imaging report</option>
          <option value="MyHealth registration">MyHealth registration</option>
          <option value="New PT registration form">New PT registration form</option>
          <option value="Pathology results">Pathology results</option>
          <option value="Patient consent">Patient consent</option>
          <option value="Record request">Record request</option>
          <option value="Referral letter">Referral letter</option>
          <option value="Workcover">Workcover</option>
          <option value="Workcover consent">Workcover consent</option>
        </select>
      </div>

      <div className="flex justify-center mt-3">
        <button
          type="button"
          className="bg-green-600 rounded px-4 py-2 font-bold text-white mt-3 cursor-pointer"
        >
          Approve
        </button>
      </div>
    </div>
  );
}
