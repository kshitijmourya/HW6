var mongoose = require('mongoose');
var viewSchema = require('./view.schema.server');
var viewModel = mongoose.model(
  'viewModel',
  viewSchema
);
