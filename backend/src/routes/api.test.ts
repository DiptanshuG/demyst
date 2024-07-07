import request from "supertest";
import express from "express";
import apiRouter from "../routes/api";

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

test("GET /api/balance-sheet", async () => {
  const response = await request(app).get("/api/balance-sheet");
  console.log(response.body);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("Reports");
  expect(response.body.Reports).toHaveLength(1);

  const report = response.body.Reports[0];
  expect(report).toHaveProperty("ReportID", "BalanceSheet");
  expect(report).toHaveProperty("ReportName", "Balance Sheet");
  expect(report).toHaveProperty("ReportType", "BalanceSheet");
  expect(report).toHaveProperty("ReportDate", "07 July 2024");
});
