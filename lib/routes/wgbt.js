'use strict';
const express = require('express');
const router = express.Router();
const { Alert, AlertEmail, Wbgt } = require('../models')

router.get('/wgbts/:id', async (req, res) => {
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

module.exports = router;