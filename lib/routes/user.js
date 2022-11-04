'use strict';
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/user/', async (req, res) => {
  let userList = await User.findAll()
  let user = userList.map(user => user.userEmail === req.body.userEmail)
  if(!user || userList.length === 0){
    user = await User.create(req.body)
  }
  try {
    console.log(user)
    res.send(user);
    
  } catch (e) {
    console.error(e);
  }
});


module.exports = router;