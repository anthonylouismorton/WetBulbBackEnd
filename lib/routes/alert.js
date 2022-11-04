'use strict';
const express = require('express');
const router = express.Router();
const { Alert } = require('../models')

router.get('/alert/', async (req, res) => {

  try {
    res.send();
    
  } catch (e) {
    console.error(e);
  }
});

router.post('/alert/', async (req, res) => {
  const json = req.body

  try {
    res.send();
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;