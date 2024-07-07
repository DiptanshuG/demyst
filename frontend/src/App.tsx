import React from "react";
import BalanceSheetTable from "./components/BalanceSheetTable";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="font-bold">Balance Sheet</h1>
      <BalanceSheetTable />
    </div>
  );
};

export default App;
