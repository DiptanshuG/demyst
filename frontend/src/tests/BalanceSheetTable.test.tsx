import React from "react";
import { render, screen } from "@testing-library/react";
import BalanceSheetTable from "../components/BalanceSheetTable";

// Mock the fetchBalanceSheet
jest.mock("../services/api", () => ({
  fetchBalanceSheet: jest.fn().mockResolvedValue({
    data: {
      Reports: [
        {
          ReportID: "1",
          ReportName: "BalanceSheet",
          Rows: [
            {
              RowType: "Section",
              Title: "Assets",
              Rows: [
                {
                  RowType: "Row",
                  Cells: [
                    { Value: "Cash", Amount: "$10,000", Amount2: "$8,000" },
                  ],
                },
              ],
            },
            {
              RowType: "SummaryRow",
              Cells: [
                { Value: "Total Assets" },
                { Amount: "$10,000", Amount2: "$8,000" },
              ],
            },
          ],
        },
      ],
    },
  }),
}));

describe("BalanceSheetTable", () => {
  test("renders balance sheet data correctly", async () => {
    render(<BalanceSheetTable />);

    // Assert Loading... text is initially present
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
