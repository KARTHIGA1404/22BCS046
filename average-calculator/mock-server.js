const express = require('express');
const app = express();
const PORT = 5000;

const responses = {
    primes: [2, 3, 5, 7, 11],
    fibo: [55,89,144,233,377,610,987,1597,2584,4181,6765],
    even: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56
],
    rand: [2,19,25,7,4,24,17,30,21,14,10,23]
};

app.get('/evaluation-service/:type', (req, res) => {
    const type = req.params.type;
    const numbers = responses[type] || [0];
    setTimeout(() => res.json({ numbers }), 100); // simulate 100ms delay
});

app.listen(PORT, () => {
    console.log(`🧪 Mock server running at http://localhost:${PORT}`);
});
