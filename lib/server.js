'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const scraperRoute = require('./routes/scraper');
const alertRoute = require('./routes/alert');
const userRoute = require('./routes/user');
app.use(scraperRoute);
app.use(alertRoute)
app.use(userRoute)

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => console.log(`listening on ${port}`));
	},
};