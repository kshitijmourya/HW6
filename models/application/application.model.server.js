var mongoose = require('mongoose');
var applicationSchema = require('./application.schema.server');
var applicationModel = mongoose.model(
  'applicationModel',
  applicationSchema
);
