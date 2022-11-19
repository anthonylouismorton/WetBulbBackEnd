const cron = require('node-cron');
const { Alert, Wbgt } = require('../models')
const getWbgtInfo = require('../wgbt/getWbgtInfo');

module.exports = () => {  
  cron.schedule('0 */10 * * * *', async () => {
    console.log('getting information every 10 minutes')
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

      // uncomment to test flag condition temperatures
      // alertInfo = {
      //   dryTemp: '90',
      //   humidity: '83',
      //   windspeed: '83',
      //   barometer: '83',
      //   alertId: alert.alertId,
      //   date: '83',
      //   time: '83',
      //   solarRadiance: '83',
      //   directWBGT: '90',
      //   shadedWBGT: '83',
      //   heatIndex: '83',
      // }
      let createdWgbt = ''
      if(alert.flagCondition === 'all'){
        console.log('in all')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'green' && parseInt(alertInfo.directWBGT) >= 82){
        console.log('in green')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'yellow' && parseInt(alertInfo.directWBGT) >= 85){
        console.log('in yellow')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'red' && parseInt(alertInfo.directWBGT) >= 88){
        console.log('in red')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else if(alert.flagCondition === 'black' && parseInt(alertInfo.directWBGT) >= 90){
        console.log('in black')
        createdWgbt = await Wbgt.create(alertInfo);
      }
      else{
        console.log('no alert created')
      }
      console.log(createdWgbt, 'this is the created wgbt');
    })
    console.log(alerts);
  });
}