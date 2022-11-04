'use strict';
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/user/:email', async (req, res) => {
  let user = await User.findOne({ where: { userEmail: req.params.email } });
  if(!user){
    user = await User.create({ userEmail: req.params.email })
  }
  try {
    res.send(user);
    
  } catch (e) {
    console.error(e);
  }
});


module.exports = router;