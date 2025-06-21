function calculateCorrelation(prices1, prices2) {
  const len = Math.min(prices1.length, prices2.length);
  if (len === 0) return 0;

  const x = prices1.slice(0, len).map(p => p.price);
  const y = prices2.slice(0, len).map(p => p.price);

  const meanX = average(x);
  const meanY = average(y);

  const numerator = x.reduce((sum, xi, i) => sum + ((xi - meanX) * (y[i] - meanY)), 0);
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0) *
    y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0)
  );

  return denominator === 0 ? 0 : numerator / denominator;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

module.exports = { calculateCorrelation };
