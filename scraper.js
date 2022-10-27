'use strict';
const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
 
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['script1.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
  });

});

router.get('/scraper', async (req, res) => {
  const url = 'https://forecast.weather.gov/MapClick.php?lat=36.2424&lon=-115.042';
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const temperature = $('p.myforecast-current-lrg').text();

    // console.log(weatherRows.children)
    const weatherRows = []
    $('tr > td').each((_idx, el) => {
      const info = $(el).text()
      weatherRows.push(info)
    })
    const weatherInfo = {
      'temperature': temperature.slice(0,2),
      'humidity': weatherRows[1].slice(0,2),
      'windspeed': weatherRows[3].replace(/\D/g, ""),
      'barometer': weatherRows[5].slice(0,5)
    }
    console.log(weatherRows)
    // for row in weatherRows:
        // title = row.css('b::text').get()
        // if title == 'Humidity':
        //     item['humidity'] = row.css('td::text').get()
        // if title == 'Wind Speed':
        //     item['windspeed'] = row.css('td::text').get()
        // if title == 'Barometer':
        //     item['barometer'] = row.css('td::text').get()

    res.send(weatherInfo)
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;