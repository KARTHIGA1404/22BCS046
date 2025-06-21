const express = require('express');
const router = express.Router();
const { fetchStockData, calculateAverage } = require('../services/stockService');

// Route: /stocks/:ticker?minutes=m&aggregation=average
router.get('/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  if (aggregation !== 'average') {
    return res.status(400).json({ error: 'Invalid aggregation method. Only "average" supported.' });
  }

  try {
    const prices = await fetchStockData(ticker, minutes);
    const average = calculateAverage(prices);
    res.json({ averageStockPrice: average, priceHistory: prices });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data.' });
  }
});

module.exports = router;
