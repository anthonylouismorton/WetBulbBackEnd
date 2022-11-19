'use strict';
const axios = require('axios');
const puppeteer = require('puppeteer');

const getWbgtInfo = async (lat, lon) => {
  const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=698c67f9881bc777269a22e04b573368`)
  console.log(getWeather.data, 'this is the weather data')
  let unix_timestamp = getWeather.data.dt
  var newDate = new Date(unix_timestamp * 1000);
  console.log(newDate, 'this is the newDate')
  var date = `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`
  var time = newDate.toLocaleTimeString("it-IT").slice(0,5);
  const windspeed = Math.round(((getWeather.data.wind.speed * 2.237) + Number.EPSILON) * 100) / 100
  const temperature = Math.round((((getWeather.data.main.temp - 273.15)*1.8)+32 + Number.EPSILON) * 100) / 100
  const barometer = Math.round(((getWeather.data.main.pressure /  33.86389) + Number.EPSILON) * 100) / 100
  let information = {
    weatherInfo:{
      'temperature': temperature,
      'humidity': getWeather.data.main.humidity,
      'windspeed': windspeed,
      'barometer': barometer
    },
    dateTimeInfo: {
      date: date,
      time: time
    }
  }
  console.log(information,'this is the information')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.osha.gov/heat-exposure/wbgt-calculator');
    await page.type('input[name="dd"]', `${date}`);
    await page.type('input[name="tm"]', `${time}`);
    const timeZone = await page.$('[name="tz"]');
    await timeZone.select('-8')
    await page.type('input[name="lat"]', `${lat}`);
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
        shadedWBGT: shadeWBGT.split('/')[1].replace(/\D/g, ""),
        heatIndex: heatIndex.split('/')[0].replace(/\D/g, "")
      }
    }
    console.log(information);
    return information;
}

module.exports = getWbgtInfo;