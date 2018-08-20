var mongoose = require('mongoose');
var developerSchema = require('./developer.schema.server');
var developerModel = mongoose.model(
  'DeveloperModel',
  developerSchema
);

developerModel.findAllDevelopers = findAllDevelopers;
module.exports = developerModel;

function findAllDevelopers(){
  return developerModel.find();
}
