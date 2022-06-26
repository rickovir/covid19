"use strict";
const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
const router = express.Router();

const mockData = require('./mock-data');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/", (req, res) => {
  return res.json({
    hello: "hi!"
  });
});

router.get("/update", async (req, res) => {
    axios.get("https://data.covid19.go.id/public/api/updatex.json")
    .then((resp) => {
        return res.json({
            message: 'ok',
            dbStatus: 1,
            data: resp.data || null
        });
    })
    .catch(() => {
        return res.json({
            message: 'ok',
            dbStatus: 0,
            data: mockData
        });
    });
});

//set netlify
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);