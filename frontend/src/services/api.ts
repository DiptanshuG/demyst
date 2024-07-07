const API_URL = 'http://localhost:3000/api/balance-sheet';

export const fetchBalanceSheet = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch balance sheet data');
  }
  return response.json();
};
