'use strict';
const app = require('./server.js');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.start(PORT);