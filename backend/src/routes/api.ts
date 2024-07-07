import express from 'express';

const router = express.Router();

router.get('/balance-sheet', (req, res) => {
  try {
    const mockData = {
      assets: {
        currentAssets: 1000,
        nonCurrentAssets: 5000,
      },
      liabilities: {
        currentLiabilities: 2000,
        nonCurrentLiabilities: 3000,
      },
      equity: {
        ownersEquity: 1000,
      },
    };
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
