'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const scraperRoute = require('./scraper')
app.use(scraperRoute)

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => console.log(`listening on ${port}`));
	},
};