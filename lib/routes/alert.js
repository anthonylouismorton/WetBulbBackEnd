'use strict';
const express = require('express');
const router = express.Router();
const { Alert, AlertEmail } = require('../models')

router.get('/alerts/:email', async (req, res) => {
  try {
    const alertEmail = req.params.email
		console.log(alertEmail, 'this is the alertEmail')
    let alerts = await Alert.findAll({where: {alertEmail: alertEmail}})
    let completeAlert = await Promise.all(alerts.map(async (alert) => {
      let alertEmail = await AlertEmail.findAll({ where: {alertId: alert.alertId}});
      alert = {alert, emails: alertEmail}
      return alert
    }))
    res.send(completeAlert);
    
  } catch (e) {
    console.error(e);
  }
});


router.post('/alert/', async (req, res) => {
	try{
		const json = req.body;
		let newAlert = await Alert.create(json);
		console.log(newAlert)
		res.status(201).send(newAlert);
	}
	catch(e){
		return e;
	}
});

router.post('/alertEmail/:id', async (req, res) => {
	try{
		const json = req.body;
    let newAlertEmail = await AlertEmail.create(json);
		res.status(201).send(newAlertEmail);
	}
	catch(e){
		return e;
	}
});

module.exports = router;