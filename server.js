const express = require('express');
const app = express();
const { getUserTransaction, getTokenPrice } = require('./contractInteraction');

app.use(express.json());

app.post('/getUserTransaction', async (req, res) => {
    try {
        const { userAddress, txNo } = req.body;
        const result = await getUserTransaction(userAddress, txNo);
        const serializedResult = JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        res.setHeader('Content-Type', 'application/json');
        res.send(serializedResult);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/getTokenPrice', async (req, res) => {
    try {
        const result = await getTokenPrice();
        const serializedResult = JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        res.setHeader('Content-Type', 'application/json');
        let serializedResultWithoutQuotes = serializedResult.replace(/"/g, '');
        res.send(serializedResultWithoutQuotes);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));