import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

test("renders the app with Balance Sheet heading", () => {
  render(<App />);

  React.act(() => {
    expect(screen.getByText("Balance Sheet")).toBeInTheDocument();
  });
});
