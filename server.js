// server.js
const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./database.config.js');


// initialize our express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:5200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Connecting to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hw6db',
{ useMongoClient: true });
mongoose.Promise = global.Promise;

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
})

app.get('/message/:theMessage', function (req, res) {
  var theMessage = req.params['theMessage'];
  res.send(theMessage);
})

var developerService = require('./services/developer.service.server');
developerService(app);


let port = 3000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
