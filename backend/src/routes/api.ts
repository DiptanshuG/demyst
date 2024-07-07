import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const xeroApiUrl = 'https://api.xero.com/api.xro/2.0/Reports/BalanceSheet';

router.get('/balance-sheet', async (req, res) => {
  const { date, periods, timeframe, trackingOptionID1, trackingOptionID2, standardLayout, paymentsOnly } = req.query;

  try {
    const response = await axios.get(xeroApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}`,
      },
      params: {
        date,
        periods,
        timeframe,
        trackingOptionID1,
        trackingOptionID2,
        standardLayout,
        paymentsOnly,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Xero API' });
  }
});

export default router;
