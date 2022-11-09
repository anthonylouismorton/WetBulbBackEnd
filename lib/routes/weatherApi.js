'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/weatherApi/', async (req, res) => {
  const { lat, lon} = req.query
  try {
    let weatherInfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=698c67f9881bc777269a22e04b573368`)
    console.log(weatherInfo.data);
    res.send(weatherInfo.data);
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;