function generateMockPrices(minutes) {
  const now = new Date();
  const data = [];

  for (let i = 0; i < minutes; i++) {
    data.push({
      price: parseFloat((Math.random() * 1000 + 100).toFixed(2)), // random price between 100 and 1100
      timestamp: new Date(now.getTime() - i * 60 * 1000).toISOString()
    });
  }

  return data;
}

async function fetchStockData(ticker, minutes) {
  // Simulate delay and return mock data
  return new Promise((resolve) => {
    const data = generateMockPrices(Number(minutes));
    resolve(data);
  });
}

function calculateAverage(data) {
  if (!data || data.length === 0) return 0;
  const sum = data.reduce((acc, curr) => acc + curr.price, 0);
  return sum / data.length;
}

module.exports = { fetchStockData, calculateAverage };
