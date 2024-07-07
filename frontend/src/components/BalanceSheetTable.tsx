import React, { useEffect, useState } from 'react';
import { fetchBalanceSheet } from '../services/api';

interface BalanceSheet {
  assets: {
    currentAssets: number;
    nonCurrentAssets: number;
  };
  liabilities: {
    currentLiabilities: number;
    nonCurrentLiabilities: number;
  };
  equity: {
    ownersEquity: number;
  };
}

const BalanceSheetTable: React.FC = () => {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalanceSheet()
      .then(setBalanceSheet)
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balanceSheet) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current Assets</td>
          <td>{balanceSheet.assets.currentAssets}</td>
        </tr>
        <tr>
          <td>Non-Current Assets</td>
          <td>{balanceSheet.assets.nonCurrentAssets}</td>
        </tr>
        <tr>
          <td>Current Liabilities</td>
          <td>{balanceSheet.liabilities.currentLiabilities}</td>
        </tr>
        <tr>
          <td>Non-Current Liabilities</td>
          <td>{balanceSheet.liabilities.nonCurrentLiabilities}</td>
        </tr>
        <tr>
          <td>Owner's Equity</td>
          <td>{balanceSheet.equity.ownersEquity}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BalanceSheetTable;
