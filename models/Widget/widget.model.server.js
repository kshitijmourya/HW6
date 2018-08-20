var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model(
  'widgetModel',
  widgetSchema
);
