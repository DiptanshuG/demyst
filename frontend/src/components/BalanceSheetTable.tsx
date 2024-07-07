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
  console.log({ balanceSheet });
  useEffect(() => {
    fetchBalanceSheet()
      .then((data) => {
        console.log({ data }); // Check console output for data structure
        setBalanceSheet(data.Reports[0]);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balanceSheet) {
    return <div>Loading...</div>;
  }

  const renderRows = (rows: BalanceSheetRow[]) => {
    return rows.map((row, index) => {
      if (row.RowType === "Section") {
        return (
          <tr key={index}>
            <th colSpan={3}>{row.Title}</th>
          </tr>
        );
      } else if (row.RowType === "Row" || row.RowType === "SummaryRow") {
        return (
          <tr key={index}>
            {row.Cells?.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell.Value}</td>
            ))}
          </tr>
        );
      } else if (row.Rows) {
        return (
          <React.Fragment key={index}>{renderRows(row.Rows)}</React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Value (Current Period)</th>
          <th>Value (Previous Period)</th>
        </tr>
      </thead>
      <tbody>{renderRows(balanceSheet.Rows)}</tbody>
    </table>
  );
};

export default BalanceSheetTable;
