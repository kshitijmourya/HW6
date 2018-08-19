var mongoose = require('mongoose');
var applicationSchema = require('./application.schema.server');
var applicationModel = mongoose.model(
  'DeveloperModel',
  developerSchema
);


function createDeveloper(developer){
  return developerModel.create(developer);
}

function findAllDeveloper(){
  return developerModel.findAll();
}

function findDeveloper(userId){
  return developerModel.findById(userId);
}


function deleteDeveloper(userId){
  return developerModel.delete(userId);
}

function updateDeveloper(userId){
  return developerModel.update({
    _id: userId
  },{

  });
}

var api={
createDeveloper: createDeveloper,
findAllDeveloper: findAllDeveloper,
findDeveloper: findDeveloper,
deleteDeveloper: deleteDeveloper,
updateDeveloper: updateDeveloper
};

module.exports = api;
