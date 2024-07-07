import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const xeroApiUrl = "http://localhost:3000/api.xro/2.0/Reports/BalanceSheet";

router.get("/balance-sheet", async (req, res) => {
  try {
    const response = await axios.get(xeroApiUrl);
    console.log({ response });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Xero API" });
  }
});

export default router;
