const express = require('express');
const https = require('https');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    https.get('https://data.covid19.go.id/public/api/update.json', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
        res.send(JSON.parse(data));
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})