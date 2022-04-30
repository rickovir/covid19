const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get("/naga", (req, res) => {
    https.get('https://data.covid19.go.id/public/api/update.json', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        res.json(JSON.parse(data));
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);