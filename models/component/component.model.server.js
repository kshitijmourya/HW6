var mongoose = require('mongoose');
var componentSchema = require('./component.schema.server');
var componentModel = mongoose.model(
  'componentModel',
  componentSchema
);
