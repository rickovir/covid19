const express = require("express");
const serverless = require("serverless-http");
const https = require('https');
const cors = require('cors')

const app = express();
const router = express.Router();

// const allowedOrigins = [
//     "https://app.example.com",
//     "https://example.com",
// ];

// check origin
var corsOptions = {
    origin: (origin, callback) => {
        if (
            process.env.NETLIFY_DEV === "true" 
            // ||
            // allowedOrigins.includes(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

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

//set middleware
// app.use(cors());

//set netlify
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);