const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const helmet = require('helmet');

const PORT = 3000;
const app = express();

app.use(helmet());

app.get('/secret', (req, res) => {
    return res.send('Your pesonal secret value is 42!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// "C:\openssl\bin\openssl.exe" req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});