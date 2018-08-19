module.exports = function(app){
  app.get('/api/developer', findAllDeveloper);
  app.get('/api/developer/:userId', findDeveloper);
  app.post('/api/developer', createDeveloper);
  app.put('/api/developer/:userId', findDeveloper);
  app.delete('/api/developer/:userId', deleteDeveloper);


  var developerModel = require('../models/developer/developer.model.server');

  function findDeveloper(req, res) {
    var id = req.params['userId'];
    developerModel.findDeveloper(id)
      .then(function (developer) {
        res.json(developer);
      })
  }

  function createDeveloper(req, res) {
   var developer = req.body;
   developerModel.createDeveloper(developer)
     .then(function (developer) {
       res.send(developer);
     })
 }

 function findAllDeveloper(req, res) {
   developerModel.findAllDeveloper()
     .then(function (developer) {
       res.send(developer);
     })
 }

 function deleteDeveloper(req, res) {
   developerModel.deleteDeveloper()
   .then(function (developer){
     res.send(developer);
   })
 }

}
