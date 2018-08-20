// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./database.config.js');

// initialize our express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Connecting to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hw6db',
{  });
mongoose.Promise = global.Promise;

const applicationRouter = require('./routes/apis/application');
const componentRouter = require('./routes/apis/component');
const developerRouter = require('./routes/apis/developer');
const viewRouter = require('./routes/apis/view');
const widgetRouter = require('./routes/apis/widget');
require('./models/developer/developer.model.server');
require('./models/application/application.model.server');
require('./models/component/component.model.server');
require('./models/View/view.model.server');
require('./models/Widget/widget.model.server');


app.use('/api/developer', developerRouter);
app.use('/api/application', applicationRouter);
app.use('/api/component', componentRouter);
app.use('/api/component', componentRouter);
app.use('/api/view', viewRouter);
app.use('/api/widget', widgetRouter);

module.exports = app;

let port = 3000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
