'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const getWbgtInfo = async (lat, lon) => {
  console.log(lat, lon, 'this is the lat lon --------------------------------')
  var currentdate = new Date(); 
  var time = `${currentdate.getHours()}:${currentdate.getMinutes()}`
  var date = `${currentdate.getMonth()+1}/${currentdate.getDate()}/${currentdate.getFullYear()}`
  const url = `https://forecast.weather.gov/MapClick.php?lat=${lat}&lon=${lon}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const temperature = $('p.myforecast-current-lrg').text();

    // console.log(weatherRows.children)
    const weatherRows = []
    $('tr > td').each((_idx, el) => {
      const info = $(el).text()
      weatherRows.push(info)
    })
    // console.log(weatherRows)
    let information = {
      weatherInfo:{
        'temperature': temperature.slice(0,2),
        'humidity': weatherRows[1].slice(0,2).replace('%',''),
        'windspeed': weatherRows[3].replace(/\D/g, ""),
        'barometer': weatherRows[5].slice(0,5)
      },
      dateTimeInfo: {
        date: date,
        time: time
      }
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.osha.gov/heat-exposure/wbgt-calculator');
    await page.type('input[name="dd"]', `${date}`);
    await page.type('input[name="tm"]', `${time}`);
    const timeZone = await page.$('[name="tz"]');
    await timeZone.select('-8')
    await page.type('input[name="lat"]', `${lat}`);
    console.log(lon)
    await page.type('input[name="lon"]', `${lon.replace("-", "")}`);
    await page.type('input[name="temp"]', `${information.weatherInfo.temperature}`);
    await page.type('input[name="rh"]', `${information.weatherInfo.humidity}`);
    await page.type('input[name="ws"]', `${information.weatherInfo.windspeed}`);
    await page.type('input[name="pres"]', `${information.weatherInfo.barometer}`);
    await page.click('input[type="button"]');
    const directWBGT = await page.$eval('[name="wbgt_sun"]', ({ value }) => value);
    const csi = await page.$eval('input[name="csi"]', ({ value }) => value);
    const shadeWBGT = await page.$eval('input[name="wbgt_shade"]', ({ value }) => value);
    const heatIndex = await page.$eval('input[name="heatindex"]', ({ value }) => value);
    await browser.close();
    information = {
      ...information,
      wgbtInfo: {
        directWBGT: directWBGT.split('/')[1].replace(/\D/g, ""),
        solarRadiance: csi,
        shadeWBGT: shadeWBGT.split('/')[1].replace(/\D/g, ""),
        heatIndex: heatIndex.split('/')[0].replace(/\D/g, "")
      }
    }
    console.log(information);
    return information;
}

module.exports = getWbgtInfo;