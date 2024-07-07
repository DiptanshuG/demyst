import React, { useEffect, useState } from "react";
import { fetchBalanceSheet } from "../services/api";

interface BalanceSheetCell {
  Value: string;
}

interface BalanceSheetRow {
  RowType: "Header" | "Section" | "Row" | "SummaryRow";
  Title?: string;
  Cells?: BalanceSheetCell[];
  Rows?: BalanceSheetRow[];
}

interface BalanceSheetReport {
  ReportID: string;
  ReportName: string;
  Rows: BalanceSheetRow[];
}

const BalanceSheetTable: React.FC = () => {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheetReport | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalanceSheet()
      .then((data) => {
        setBalanceSheet(data.Reports[0]);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!balanceSheet) {
    return <div>Loading...</div>;
  }

  const renderRows = (rows: BalanceSheetRow[], depth = 0) => {
    return rows.map((row, index) => {
      const indentStyle = `pl-${depth * 5}`; // Tailwind padding-left classes for indentation

      if (row.RowType === "Section") {
        return (
          <React.Fragment key={index}>
            <tr className="bg-gray-100 font-bold">
              <td colSpan={3} className={`p-2 text-left mx-8  ${indentStyle}`}>
                {row.Title}
              </td>
            </tr>
            {row.Rows && renderRows(row.Rows, depth + 1)}
          </React.Fragment>
        );
      } else if (row.RowType === "Row" || row.RowType === "SummaryRow") {
        return (
          <tr key={index}>
            {row.Cells?.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-2 border-b border-gray-200">
                {cell.Value}
              </td>
            ))}
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 bg-green-600 text-white">Category</th>
            <th className="p-2 bg-green-600 text-white">
              Value (Current Period)
            </th>
            <th className="p-2 bg-green-600 text-white">
              Value (Previous Period)
            </th>
          </tr>
        </thead>
        <tbody>{renderRows(balanceSheet.Rows)}</tbody>
      </table>
    </div>
  );
};

export default BalanceSheetTable;
