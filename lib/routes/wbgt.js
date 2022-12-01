'use strict';
const express = require('express');
const router = express.Router();
const { Alert, AlertEmail, Wbgt } = require('../models')

router.get('/alertwgbts/:id', async (req, res) => {
  try {
    const alertId = parseInt(req.params.id)
    let wgbts = await Wbgt.findAll({where: {alertId: alertId}}) 
    // let completeAlert = await Promise.all(wgbts.map(async (alert) => {
    //   let alertEmail = await AlertEmail.findAll({ where: {alertId: alert.alertId}});
    //   alert = {alert, emails: alertEmail}
    //   return alert
    // }))
    res.send(wgbts);
    
  } catch (e) {
    console.error(e);
  }
});

router.get('/userwbgts/:id', async (req, res) => {
  console.log(req.params, 'this is the user id')
  try {
    const userId = parseInt(req.params.id)
    console.log(userId)
    const alerts = await Alert.findAll({ where: {userId: userId} });
    let alertList = [];
    const getWgbts = await Promise.all(alerts.map(async (alert) => {
      console.log('this is the alert inside the promise.all', alert)
      let wbgtList = await Wbgt.findAll({
        where: {alertId: alert.alertId},
        include: [{
          model: Alert, as: 'alert'
        }]
      })
      wbgtList.forEach(wbgt => {
        alertList.push(wbgt)
      });
    }));
    console.log(alertList)
    // const wgbts = await Wbgt.findAll({where: {userId: userId}});
    
    // let completeAlert = await Promise.all(wgbts.map(async (alert) => {
    //   let alertEmail = await AlertEmail.findAll({ where: {alertId: alert.alertId}});
    //   alert = {alert, emails: alertEmail}
    //   return alert
    // }))
    res.send(alertList);
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;