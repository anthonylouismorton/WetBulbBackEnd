'use strict';
const express = require('express');
const router = express.Router();
const getWbgtInfo = require('../wgbt/getWbgtInfo');

router.get('/quickSearch/', async (req, res) => {
  const {lat, lon} = req.query
  try {
    const weatherInfo = await getWbgtInfo(lat,lon)
    res.send(weatherInfo);
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;