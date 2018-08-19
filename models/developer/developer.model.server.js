var mongoose = require('mongoose');
var developerSchema = require('./developer.schema.server');
var developerModel = mongoose.model(
  'DeveloperModel',
  developerSchema
);


function createDeveloper(developer){
  return developerModel.create(developer);
}

function findAllDeveloper(){
  return developerModel.find([username]);
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
