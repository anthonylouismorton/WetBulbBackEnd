
'use strict';
const express = require('express');
const addressRouter = express.Router();
require('dotenv').config();
const axios = require('axios');

addressRouter.get('/api/address/', async (req, res) => {
try {
let address = req.query.address;
let convertedAddress = address.replace(/%20/g, ' ');
let response = await axios.get(
`https://maps.googleapis.com/maps/api/geocode/json?address=${convertedAddress}&key=${process.env.MAP_API_KEY}`
);
res.status(200).send(response.data.results[0].geometry.location);
} catch (err) {
res.status(400).send(err);
}
});
module.exports = addressRouter;