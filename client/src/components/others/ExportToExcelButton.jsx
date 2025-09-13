import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcelButton = ({ data, fileName = "Export" }) => {
  const handleExport = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex-1 sm:flex-none bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition"
    >
      Export to Excel
    </button>
  );
};

export default ExportToExcelButton;
