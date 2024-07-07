const API_URL = "http://localhost:8088/api/balance-sheet";

interface FetchBalanceSheetParams {
  date?: string;
  periods?: number;
  timeframe?: "MONTH" | "QUARTER" | "YEAR";
  trackingOptionID1?: string;
  trackingOptionID2?: string;
  standardLayout?: boolean;
  paymentsOnly?: boolean;
}

export const fetchBalanceSheet = async (params?: FetchBalanceSheetParams) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(`${API_URL}?${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch balance sheet data");
  }
  return response.json();
};
