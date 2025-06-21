const express = require('express');
const router = express.Router();
const { fetchStockData, calculateAverage } = require('../services/stockService');
const { calculateCorrelation } = require('../utils/correlationUtils');

// Route: /stockcorrelation?minutes=m&ticker=XXX&ticker=YYY
router.get('/', async (req, res) => {
  const { minutes, ticker } = req.query;
  if (!ticker || ticker.length !== 2) {
    return res.status(400).json({ error: 'Exactly 2 tickers must be provided.' });
  }

  try {
    const [ticker1, ticker2] = ticker;
    const [data1, data2] = await Promise.all([
      fetchStockData(ticker1, minutes),
      fetchStockData(ticker2, minutes)
    ]);

    const corr = calculateCorrelation(data1, data2);
    const avg1 = calculateAverage(data1);
    const avg2 = calculateAverage(data2);

    res.json({
      correlation: corr,
      stocks: {
        [ticker1]: { averagePrice: avg1, priceHistory: data1 },
        [ticker2]: { averagePrice: avg2, priceHistory: data2 }
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error calculating correlation.' });
  }
});

module.exports = router;
