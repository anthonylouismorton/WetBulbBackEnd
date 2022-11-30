'use strict';
const axios = require('axios');
const puppeteer = require('puppeteer');

const getWbgtInfo = async (lat, lon) => {
  console.log(lat, lon)
  const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=698c67f9881bc777269a22e04b573368`)
  console.log(getWeather.data, 'this is the weather data')
  let unix_timestamp = getWeather.data.dt
  var newDate = new Date(unix_timestamp * 1000);

  //Local date/time for the db. This time is not used for the OSHA tool due to timezone restrictions
  var localDate = new Date((unix_timestamp + getWeather.data.timezone) * 1000)
  var localDay = `${localDate.getMonth()+1}/${localDate.getDate()}/${localDate.getFullYear()}`
  var localTime = localDate.toJSON().slice(11,16)
  
  //Convert time to Pacific time zone. OSHA tool does not allow you to use time zones from around the world
  var date = `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`
  var time = newDate.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: false}).slice(0,5);
  console.log({
    localDay: localDay,
    localTime: localTime,
    oshaDate: date,
    oshaTime: time
  }, 'this is the date and time differences')

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
      date: localDay,
      time: localTime
    }
  }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.osha.gov/heat-exposure/wbgt-calculator');
    await page.type('input[name="dd"]', `${date}`);
    await page.type('input[name="tm"]', `${time}`);

    // Dates were converted to pacific time zone. -8 timezone is pacific time zone on the osha page
    const timeZone = await page.$('[name="tz"]');
    await timeZone.select('-8')
    if(lat[0] === '-'){
      console.log('in the southern hemisphere')
      await page.click('input[name="latNS"]')
    }
    if(lon[0] !== '-'){
      console.log('in the eastern hemisphere')
      await page.click('input[name="lonWE"]')
    }
    await page.type('input[name="lat"]', `${lat.replace("-", "")}`);
    await page.type('input[name="lon"]', `${lon.replace("-", "")}`);
    await page.type('input[name="temp"]', `${information.weatherInfo.temperature}`);
    await page.type('input[name="rh"]', `${information.weatherInfo.humidity}`);
    await page.type('input[name="ws"]', `${information.weatherInfo.windspeed}`);
    await page.type('input[name="pres"]', `${information.weatherInfo.barometer}`);
    console.log('here')
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