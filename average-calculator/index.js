const express = require('express');
const axios = require('axios');
const WindowManager = require('./windowManager');

const app = express();
const PORT = 9876;
const windowSize = 10;
const manager = new WindowManager(windowSize);

// 🔁 Using mock server
const ID_TO_URL = {
    'p': 'http://localhost:5000/evaluation-service/primes',
    'f': 'http://localhost:5000/evaluation-service/fibo',
    'e': 'http://localhost:5000/evaluation-service/even',
    'r': 'http://localhost:5000/evaluation-service/rand',
};

app.get('/numbers/:id', async (req, res) => {
    const id = req.params.id;

    if (!ID_TO_URL[id]) {
        return res.status(400).json({ error: 'Invalid ID. Use p, f, e, or r' });
    }

    try {
        const response = await axios.get(ID_TO_URL[id], { timeout: 500 });
        const numbers = response.data.numbers;
        const result = manager.update(numbers);
        res.json(result);
    } catch (err) {
        console.error("API call failed:", err.message);
        return res.status(500).json({ error: 'API call failed or timed out' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Microservice running at http://localhost:${PORT}`);
});
