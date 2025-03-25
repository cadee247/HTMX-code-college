import express from 'express';
import path from 'path';

const app = express();

// Set static folder to serve HTML and assets like CSS/JS
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

let currentPrice = 60;

// API to get the current price
app.get('/get-price', (req, res) => {
    currentPrice = currentPrice + Math.random() * 2 - 1; // Random change between -1 and 1
    res.send('$' + currentPrice.toFixed(1)); // Send updated price
});

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});