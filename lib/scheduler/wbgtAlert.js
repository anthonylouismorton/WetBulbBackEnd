const cron = require('node-cron');
const { Alert, Wbgt } = require('../models')
const getWbgtInfo = require('../wbgt/getWbgtInfo');

module.exports = () => {  
  cron.schedule('0 */15 * * * *', async () => {
    console.log('getting information every 15 minutes')
    var today = new Date();
    var hour = today.getHours();
    let alerts = '';
    let alertInfo = '';
    if(hour % 4 === 0){
      console.log('in the if')
      alerts = await Alert.findAll({where: {frequency: ['4hours', '2hours', 'hourly']}});
    }
    else if(hour % 2 === 0){
      console.log('in the else if')
      alerts = await Alert.findAll({where: {frequency: ['2hours', 'hourly']}});
    }
    else{
      console.log('in the else')
      alerts = await Alert.findAll({where: {frequency: 'hourly'}});
    }
    alerts.map(async (alert) => {
      alertInfo = await getWbgtInfo(alert.lat,alert.lon)
      alertInfo = {
        dryTemp: alertInfo.weatherInfo.temperature,
        humidity: alertInfo.weatherInfo.humidity,
        windspeed: alertInfo.weatherInfo.windspeed,
        barometer: alertInfo.weatherInfo.barometer,
        alertId: alert.alertId,
        date: alertInfo.dateTimeInfo.date,
        time: alertInfo.dateTimeInfo.time,
        solarRadiance: alertInfo.wgbtInfo.solarRadiance,
        directWBGT: alertInfo.wgbtInfo.directWBGT,
        shadedWBGT: alertInfo.wgbtInfo.shadedWBGT,
        heatIndex: alertInfo.wgbtInfo.heatIndex
      }
      let createdWgbt = ''
      if(alert.flagCondition === 'all'){
        console.log('in all')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'green' && parseInt(alertInfo.directWBGT) >= 82){
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'yellow' && parseInt(alertInfo.directWBGT) >= 85){
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'red' && parseInt(alertInfo.directWBGT) >= 88){
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'black' && parseInt(alertInfo.directWBGT) >= 90){
        createdWgbt = await Wbgt.create(alertInfo);
      }
      // else{
      //   console.log('no alert created')
      // }
      // console.log(createdWgbt, 'this is the created wgbt');
    });
  });
};