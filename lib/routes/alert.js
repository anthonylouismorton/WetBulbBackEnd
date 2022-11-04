'use strict';
const express = require('express');
const router = express.Router();
const { Alert, AlertEmail } = require('../models')

router.get('/alerts/:id', async (req, res) => {
  console.log('hitting the route', parseInt(req.params.id))
  try {
    const userId = parseInt(req.params.id)
    console.log(userId)
    let alerts = await Alert.findAll({where: {userId: userId}}) 
    let completeAlert = await Promise.all(alerts.map(async (alert) => {
      console.log(alert)
      let alertEmail = await AlertEmail.findAll({ where: {alertId: alert.alertId}});
      console.log(alertEmail)
      alert = {alert, emails: alertEmail}
      return alert
    }))
    console.log(completeAlert)
    res.send(completeAlert);
    
  } catch (e) {
    console.error(e);
  }
});

router.post('/alert/:id', async (req, res) => {
	try{
		const json = req.body;
		let newAlert = await Alert.create(json);
		res.status(201).send(newAlert);
	}
	catch(e){
		return e;
	}
});

router.post('/alertEmail/:id', async (req, res) => {
	try{
		const json = req.body;
    console.log(json)
    let newAlertEmail = await AlertEmail.create(json);
    console.log(newAlertEmail)
		res.status(201).send(newAlertEmail);
	}
	catch(e){
		return e;
	}
});

module.exports = router;