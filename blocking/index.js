const { count } = require('console');
const express = require('express');
const app = express();

app.get('/blocking', (req, res) => {
    // Simulate a blocking operation
    const start = Date.now();
    let k = 1;
    let lastLoggedSecond = 0;
    const totalSeconds = 5;
    console.log('Blocking operation in progress...');
    while (Date.now() - start < 5000) {
        const elapsed = Math.floor((Date.now() - start) / 1000);
        if (elapsed > lastLoggedSecond && elapsed < totalSeconds) {
            console.log(`${totalSeconds - elapsed} seconds remaining`);
            lastLoggedSecond = elapsed;
        }
    }
    res.send('Blocking operation complete!');
});

app.get('/non-blocking', (req, res) => {
    console.log('Starting non-blocking operation...');
    setTimeout(() => {
        res.send('Non-blocking operation complete!');
    }, 5000);
});

app.get('/block', (req, res) => {
    const result = [];
    for (let i = 0; i < 1e8; i++) {
        result.push(i);
    }
    res.send(`Blocking computation complete! Computed ${result.length} items.`);
});

app.get('/fast', (req, res) => {
    console.log('Fast response route accessed.');
    res.send('Fast response!');
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});