'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const quickSearchRoute = require('./routes/quickSearch');
const alertRoute = require('./routes/alert');
const userRoute = require('./routes/user');
const wbgtRoute = require('./routes/wbgt');
const weatherApi = require('./routes/weatherApi');
require('./scheduler/wbgtAlert')();

app.use(quickSearchRoute);
app.use(alertRoute);
app.use(userRoute);
app.use(wbgtRoute);
app.use(weatherApi);

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => console.log(`listening on ${port}`));
	},
};